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



export const matchJob = async (resumeText: string) => {
    try {

        const embedding = await createEmbedding(resumeText);
        console.dir(embedding, { maxArrayLength: null });
        console.log("Generated embedding length:", embedding.length);
        const { data, error } = await supabaseAdmin.rpc("match_jobs", {
            query_embedding: `[${embedding.join(",")}]`
        })
        if (error) {
            console.log("Error from matchJob service")
            throw error;
        }
        console.log("RPC result:", data);
        return data;
    }
    catch (err) {
        console.error("Error matching job:", err);
        return { error: "Failed to match job" };
    }


}