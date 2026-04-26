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


export const explainJobMatch = async (resumeText: string, jobDescription: string, similarity: number) => {
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a brutally honest career advisor. 
                    Your job is to analyze how well a candidate's resume matches a job description.
                    
                    You must return ONLY valid JSON in this exact format:
                    {
                        "matchStrength": "strong" | "moderate" | "partial",
                        "summary": "2-sentence max summary of overall fit",
                        "matchingSkills": ["skill1", "skill2"],
                        "matchingExperience": ["specific overlap point 1", "specific overlap point 2"],
                        "gaps": ["gap1", "gap2"],
                        "recommendation": "one clear, actionable sentence on what the candidate should do"
                        }
                        
                        Rules:
                        - matchingSkills: only list skills EXPLICITLY present in BOTH resume and job description
                        - matchingExperience: describe actual overlap in experience, not generic statements
                        - gaps: list skills or experience the job requires but resume is missing
                        - recommendation: be direct, not motivational
                        - Never hallucinate skills that aren't in the resume
                        - Never be generic ("you have great communication skills")`
                },
                {
                    role: "user",
                    content: `
                        Resume:
                        ${resumeText}
                        
                        Job Description:
                        ${jobDescription}
                        
                        Similarity Score: ${similarity}
                        
                        Explain why this is a good match.
                        `,
                },
            ]
        })
        const content = response.choices[0].message.content || "";

        return safeParseJSON(content);
    } catch (err) {
        console.log(err);
        throw err;
    }
}