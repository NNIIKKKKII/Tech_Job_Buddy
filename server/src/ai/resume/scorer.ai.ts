import { openai } from "../core/openai.js";


export const scoreResume = async (resumeText: string) => {
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content: `
                    
                    You are a resume evaluator. 
                    Return me the answer in the form of JSON in the given below format. 
                    
                    {
                        "score"  : number,
                        "feedback" : {
                            "clarity"  :string,
                            "impact" : string,
                            "ats" : string,
                            "skills" : string
                            }    
            }
            
            `
                }, {

                    role: "user",
                    content: resumeText
                }
            ]

        })


        const content = response.choices[0].message?.content || "";


        return JSON.parse(content);
    } catch (err) {
        console.log("Error scoring resume", err);
        return { error: "Invalid JSON" };
    }
}