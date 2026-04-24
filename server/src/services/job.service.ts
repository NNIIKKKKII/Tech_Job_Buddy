import { createEmbedding } from "../ai/core/embedding.js";
import { supabaseAdmin } from "../db/client.js";


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

    return data;
};