import { Request, Response } from "express";
import { matchJobsByResume, saveJob } from "../services/job.service.js";

// 1. What the frontend sends
type JobUserBody = {
    title: string;
    description: string;
};

// 2. What saveJob actually returns
type SaveJobSuccess = {
    message: string;
};

// 3. Our standardized response wrapper
type ApiResponse<T> =
    | { error: string }
    | T;

// 4. We plug 'SaveJobSuccess' into the 'T' slot
export const saveJobController = async (
    req: Request<{}, {}, JobUserBody>,
    res: Response<ApiResponse<SaveJobSuccess>>
) => {
    try {
        // console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);
        console.log(req.body);
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Missing title or description" });
        }

        // result is strictly inferred as { message: string }
        const result = await saveJob(title, description);
        console.log("Saved Job result:", result);
        // This works perfectly because it matches SaveJobSuccess
        return res.json(result);

    } catch (error: any) {
        console.error("Error saving job:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const matchJobsController = async (req: Request, res: Response) => {
    try {
        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({ error: "resumeId is required" });
        }

        const matches = await matchJobsByResume(resumeId);

        return res.json(matches);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to match jobs" });
    }
};