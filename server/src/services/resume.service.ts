import { parseResume } from "../ai/resume/parser.ai.js";
import { improveResume } from "../ai/resume/improver.ai.js";
import { scoreResume } from "../ai/resume/scorer.ai.js";


export const analyzeResume = async (text: string) => {
    if (!text) {
        return { error: "Resume text is required" };
    }

    const parsedResume = await parseResume(text);
    return parsedResume;
}

export const improveResumeService = async (text: string) => {
    if (!text) {
        return { error: "Resume text is required" };
    }
    const improvedResume = await improveResume(text);
    if (!improvedResume) {
        return { error: "Error improving resume" };
    }
    return improvedResume;
}

export const scoreResumeService = async (text: string) => {
    if (!text) {
        return { error: "Resume text is required" }
    }

    const content = await scoreResume(text);
    if (!content) {
        return { error: "Error scoring resume" }
    }

    return content;
}
