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