import { openai } from "../core/openai.js"

export const generateCoverLetter = async (resumeText: string, jobDescription: string, explanation: any) => {


    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [
                {

                    role: "system",
                    content: `You are a professional career assistant. 
                    
                    Write a personalised cover letter. 
                    
                    Use:
                   - candidate strengths
                   - job requirements
                   - address gaps subtly

                    Rules:
                    - be concise
                    - professional tone
                    - no generic phrases
                    - no placeholders

`
                },
                {
                    role: "user",
                    content: `
                            Resume:
                            ${resumeText}

                            Job Description:
                            ${jobDescription}

                            Strengths:
                            ${explanation.strengths}

                            Gaps:
                            ${explanation.gaps}`
                }
            ]


        })
        console.log(`COVER LETTER TOKENS : ${response.usage?.total_tokens}`);
        return response.choices[0].message?.content || "";

    } catch (error) {
        console.log(error);
        return "";
    }
}