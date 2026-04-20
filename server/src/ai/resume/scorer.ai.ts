import { openai } from "../core/openai.js";


const cleanJSON = (text: string) => {
    try {
        // Remove ```json and ```
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (err) {
        return {
            error: "Invalid JSON from AI",
            raw: text,
        };
    }
};

const systemPrompt = `
You are a STRICT resume evaluator.

You MUST score harshly and realistically.

Scoring rules:
- 0–40 → very poor (incomplete, vague, no structure)
- 40–60 → below average (basic, lacks impact)
- 60–75 → average (some skills, but weak depth)
- 75–85 → good (clear, structured, some impact)
- 85–100 → excellent (strong achievements, metrics, clarity)

IMPORTANT:
- DO NOT inflate scores
- DO NOT be nice
- Penalize short or vague input heavily
- A one-line resume MUST score below 50

Return ONLY JSON:
{
  "score": number,
  "feedback": {
    "clarity": string,
    "impact": string,
    "ats": string,
    "skills": string
  }
}
`;

export const scoreResume = async (resumeText: string) => {
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.4,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                }, {

                    role: "user",
                    content: resumeText
                }
            ]

        })

        // console.log(response.choices[0].message?.content, "content from ai")
        const content = response.choices[0].message?.content || "";


        return cleanJSON(content);
    } catch (err) {
        console.log("Error scoring resume", err);
        return { error: "Invalid JSON" };
    }
}