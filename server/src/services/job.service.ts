import { createEmbedding } from "../ai/core/embedding.js";
import { supabaseAdmin } from "../db/client.js";


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
    console.log("Embedding:", embedding);

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



export const matchJobsByResume = async (resumeId: string) => {
    const { data, error } = await supabaseAdmin.rpc(
        "match_jobs_by_resume",
        { resume_id: resumeId }
    );

    if (error) {
        console.error("Match error:", error);
        throw error;
    }

    return data.map((job: any) => {
        return {
            job_id: job.job_id,
            title: job.title,
            similarity: Number(job.similarity.toFixed(2)),
            label: getMatchLabel(job.similarity),
        }
    })
};