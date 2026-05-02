import { openai } from "../core/openai.js";


const extractJSON = (text: string) => {
    try {
        const match = text.match(/\{[\s\S]*\}/); // means match everything
        if (!match) throw new Error("No JSON found");

        return JSON.parse(match[0]); //parse means convert JSON into JsObj
    } catch (err) {
        return {
            error: "Invalid JSON from AI",
            raw: text,
        };
    }
};



export const generateApplicationStrategy = async (
    similarity: number,
    explanation: any
) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.4,
            messages: [
                {
                    role: "system",
                    content: `
You are a job application strategist.

Return ONLY JSON:

{
  "decision": string,
  "confidence": number,
  "reason": string,
  "suggestions": string[]
}

Rules:
- Decision must be one of:
  "Apply Now", "Apply with Prep", "Skip"
- Confidence between 0 and 1
- Suggestions must be actionable
- Be concise
        `,
                },
                {
                    role: "user",
                    content: `
Similarity: ${similarity}

Strengths:
${explanation.strengths}

Gaps:
${explanation.gaps}
        `,
                },
            ],
        });

        const content = response.choices[0].message.content || "";
        console.log(`STRATEGY TOKENS : ${response.usage?.total_tokens}`);
        return extractJSON(content);


    } catch (error) {
        return { error: "Error generating strategy", raw: error };
    }
};