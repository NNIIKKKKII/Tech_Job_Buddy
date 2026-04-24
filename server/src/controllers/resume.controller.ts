import { analyzeResume, improveResumeService, scoreResumeService, saveResumeWithEmbedding } from "../services/resume.service.js";
import { Request, Response } from "express";
import { extractTextFromPDF } from "../utils/pdfParser.js";

//or
// type requestResumeUserBody = Request<{}, {}, resumeUserBody>;
// export const parseResumeController = async (req: requestResumeUserBody, res: Response) => {



export const parseResumeController = async (req: Request, res: Response) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    try {
        let text = "";

        if (req.file) {
            // PDF upload
            text = await extractTextFromPDF(req.file.buffer);
        } else {
            // direct text input
            text = req.body.text;
        }

        const result = await analyzeResume(text);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to process resume" });
    }
};


export const improveResumeController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.json("Text/Resume NOT FOUND !")
        }
        const result = await improveResumeService(text);
        return res.json({ improved: result })

    } catch (err) {
        console.log("Error improving resume at resumeimprovecontroller", err);
        res.status(500).json({ error: "Failed to improve resume" });
    }
}


export const scoreResumeController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.json("Text/Resume NOT FOUND !")
        }
        const result = await scoreResumeService(text);
        return res.json({ result })

    } catch (err) {
        console.log("Error scoring resume at resumescorecontroller", err);
        res.status(500).json({ error: "Failed to score resume" });
    }
}


export const saveResumeController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.json("Text/Resume NOT FOUND !")
        }
        const result = await saveResumeWithEmbedding(text);
        return res.json(result);
    } catch (error) {
        console.error("Error saving resume:", error);
        return res.status(500).json({ error: "Failed to save resume" });
    }
};