import { analyzeResume } from "../services/resume.service.js";
import { Request, Response } from "express";


export const parseResumeController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.json("Text/Resume NOT FOUND !")
        }

        const result = await analyzeResume(text);
        return res.json({ result })




    } catch (err) {
        console.log("Error parsing resume at resumeparsecontroller", err);
        res.status(500).json({ error: "Failed to parse resume" });
    }
}