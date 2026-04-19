import { openai } from "../core/openai.js"



export const improveResume = async (resumeText: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
            {
                role: "system",
                content: `
                You are a Resume expert 

                Rewrite the resume
                to be more impactful

                Use strong action verbs
                Use quantification
                Use ATS keywords
                Keep it professional and modern
                and use impactful measure results

                Return ONLY the improved resume text.
                `
            },
            {
                role: "user",
                content: resumeText
            }


        ]


    })
    return response.choices[0].message?.content;
}