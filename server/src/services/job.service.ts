import { createEmbedding } from "../ai/core/embedding.js";
import { supabaseAdmin } from "../db/client.js";
export const saveJob = async (title: string, description: string) => {
    const embedding = await createEmbedding(description);

    const response = await supabaseAdmin.from("jobs").insert([{
        title,
        description,
        embedding
    }])
    if (response.error) {
        throw new Error("Failed to save job");
    }
    return { message: "job Saved" };
}



export const matchJob = async (resumeText: string) => {
    try {

        const embedding = await createEmbedding(resumeText);

        const { data, error } = await supabaseAdmin.rpc("match_jobs", {
            query_embedding: embedding
        })
        if (error) {
            throw error;
        }
        return data;
    }
    catch (err) {
        console.error("Error matching job:", err);
        return { error: "Failed to match job" };
    }


}