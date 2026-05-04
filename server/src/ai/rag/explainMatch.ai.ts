import { openai } from "../core/openai.js";


const safeParseJSON = (text: string) => {
    try {
        // Step 1: remove markdown blocks
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Step 2: extract JSON object using regex
        const match = cleaned.match(/\{[\s\S]*\}/);

        if (!match) {
            throw new Error("No JSON object found");
        }

        // Step 3: parse safely
        return JSON.parse(match[0]);
    } catch (err) {
        return {
            error: "Invalid JSON from AI",
            raw: text,
        };
    }
};


export const explainJobMatch = async (resumeText: string, jobDescription: string, similarity: number, label: string) => {
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" }, // 🔥 KEY LINE
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content: `
You are a career advisor AI.

You MUST follow the given match label strictly.

Match Label meanings:
- "Best Match" → strong alignment
- "Good Match" → moderate alignment
- "Weak Match" → partial alignment with clear gaps
- "Poor Match" → low relevance

Return ONLY JSON:

{
  "matchSummary": string,
  "strengths": string[],
  "gaps": string[],
  "improvements": string[]
}

Rules:
- Your explanation MUST match the label
- If label is "Weak Match", DO NOT say "strong match"
- Be realistic, not optimistic
- Focus on actual overlap
`
                },
                {
                    role: "user",
                    content: `
Match Label: ${label}
Similarity Score: ${similarity}

Resume:
${resumeText}

Job Description:
${jobDescription}
`
                },
            ]
        })
        const content = response.choices[0].message.content || "";
        console.log(`MATCH EXPLAIN TOKENS : ${response.usage?.total_tokens}`);
        // console.log(content);
        return safeParseJSON(content);
    } catch (err) {
        console.log(err);
        throw err;
    }
}