import { openai } from "../core/openai.js"

const systemPrompt = `
You are a strict resume parser.

Extract structured data from the resume.

Return ONLY valid JSON. No explanation. No text before or after.

Follow this exact format:

{
  "name": string,
  "skills": string[],
  "experience": string[],
  "projects": string[]
}

Rules:
- Do NOT add extra fields
- Do NOT include explanations
`;

//extract the json and parse it
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

//Here the it takes resume and gives output and then the ouput is extracted and parsed as json and returned here to the serice layer from here
export const parseResume = async (resumeText: string) => {
    try {

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.1,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: resumeText },
            ],
        });

        const content = response.choices[0].message?.content || "";

        return extractJSON(content);
    } catch (error) {
        console.log("Error parsing resume", error);
        return { error: "Error parsing resume" };
    }
};