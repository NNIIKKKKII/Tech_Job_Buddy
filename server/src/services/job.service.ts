import { createEmbedding } from "../ai/core/embedding.js";
import { supabaseAdmin } from "../db/client.js";
import { explainJobMatch } from "../ai/rag/explainMatch.ai.js";
import { generateApplicationStrategy } from "../ai/application/strategy.ai.js";
import { generateCoverLetter } from "../ai/application/coverLetter.ai.js";

const getMatchLabel = (score: number): string => {
    if (score >= 0.8) return "Best Match";
    if (score >= 0.65) return "Good Match";
    if (score >= 0.5) return "Weak Match";
    return "Poor Match";
};


export const saveJob = async (title: string, description: string) => {
    console.log("Service Title:", title);
    console.log("Service Description:", description);

    const embedding = await createEmbedding(description);
    // console.log("Embedding:", embedding);

    const response = await supabaseAdmin.from("jobs").insert([{
        title,
        description,
        embedding
    }])
    if (response.error) {
        console.log("Error saving job", response.error);
        throw response.error;
    }
    return { message: "job Saved" };
}



// export const matchJobsByResume = async (resumeId: string) => {
//     try {

//         const { data, error } = await supabaseAdmin.rpc(
//             "match_jobs_by_resume",
//             { resume_id: resumeId }
//         );

//         if (error) {
//             console.error("Match error:", error);
//             throw error;
//         }
//         const topJobs = data.slice(0, 3);

//         const { data: resumeData, error: resumeError } = await supabaseAdmin //This is called object destructuring and using alias
//             .from('resumes')
//             .select('content')
//             .eq('id', resumeId)
//             .single()
//         if (resumeError) {
//             console.log("error fetching resume content", resumeError)
//             throw resumeError;
//         }

//         const resumeText = resumeData?.content || "";

//         const jobIds = topJobs.map((job: any) => job.job_id);

//         const { data: jobsFull, error: jobsError } = await supabaseAdmin
//             .from("jobs")
//             .select("id, description")
//             .in("id", jobIds);

//         if (jobsError) {
//             console.error("Error fetching full jobs:", jobsError);
//             throw jobsError;
//         }

//         if (!jobsFull) {
//             console.error("No job details found for IDs:", jobIds);
//             throw new Error("Failed to fetch job details");
//         }



//         // return data.map((job: any) => {
//         //     return {
//         //         job_id: job.job_id,
//         //         title: job.title,
//         //         similarity: Number(job.similarity.toFixed(2)),
//         //         label: getMatchLabel(job.similarity),
//         //     }
//         // })


//         const results = await Promise.all(
//             topJobs.map(async (job: any) => {
//                 const fullJob = jobsFull.find((j: any) => j.id === job.job_id);

//                 const explanation = await explainJobMatch(
//                     resumeText,
//                     fullJob?.description || "",
//                     job.similarity
//                 );

//                 return {
//                     job_id: job.job_id,
//                     title: job.title,
//                     similarity: Number(job.similarity.toFixed(2)),
//                     label: getMatchLabel(job.similarity),
//                     explanation,
//                 };
//             })
//         );
//         return results;

//     } catch (error) {
//         console.log(`Error from the service layer`, error);
//         throw error;
//     }
// };


export const matchJobsByResume = async (resumeId: string) => {
    const { data, error } = await supabaseAdmin.rpc(
        "match_jobs_by_resume",
        { resume_id: resumeId }
    );

    if (error) throw error;

    const topJobs = data.slice(0, 2); // 🔥 keep small

    // 🔹 get resume
    const { data: resumeData } = await supabaseAdmin
        .from("resumes")
        .select("content")
        .eq("id", resumeId)
        .single();

    const resumeText = resumeData?.content;

    // 🔹 get full job descriptions
    const jobIds = topJobs.map((job: any) => job.job_id);

    const { data: jobsFull } = await supabaseAdmin
        .from("jobs")
        .select("id, description")
        .in("id", jobIds);

    // 🔥 MAIN PIPELINE
    const results = await Promise.all(
        topJobs.map(async (job: any) => {
            const fullJob = jobsFull?.find((j: any) => j.id === job.job_id);

            const similarity = job.similarity;

            // 1. explanation
            const explanation = await explainJobMatch(
                resumeText,
                fullJob?.description || "",
                similarity
            );

            // 2. strategy
            const strategy = await generateApplicationStrategy(
                similarity,
                explanation
            );

            // 3. cover letter
            const coverLetter = await generateCoverLetter(
                resumeText,
                fullJob?.description || "",
                explanation
            );

            return {
                job_id: job.job_id,
                title: job.title,
                similarity: Number(similarity.toFixed(2)),
                label: getMatchLabel(similarity),
                explanation,
                strategy,
                coverLetter,
            };
        })
    );

    return results;
};