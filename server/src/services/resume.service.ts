import { parseResume } from "../ai/resume/parser.ai.js";

export const analyzeResume = async (text: string) => {
    if (!text) {
        return { error: "Resume text is required" };
    }

    const parsedResume = await parseResume(text);
    return parsedResume;
}