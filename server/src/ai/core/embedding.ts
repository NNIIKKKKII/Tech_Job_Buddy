import { openai } from "./openai.js"


export const createEmbedding = async (text: string) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    })
    console.log(response.usage.total_tokens)
    return response.data[0].embedding;
}
