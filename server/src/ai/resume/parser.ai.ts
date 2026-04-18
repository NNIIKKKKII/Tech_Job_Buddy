import { openai } from "../core/openai.js"

export const parseResume = async (resumeText: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `Ur a Resume parser Expert  and extract structured data from the resume and return in the JSON format
                
                
        in the format given below:
       {
        
        name : ...
        skills : [...],
        experience : [...],
        projects : [...]
        
        }
        
                
                `
            },
            {
                role: "user",
                content: resumeText
            }
        ]
    });

    const content = response.choices[0].message?.content;

    try {
        let json = JSON.parse(content || " {}");
        return json;


    } catch (error) {
        console.log("Error parsing resume", error);
    }

}