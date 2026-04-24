import { Request, Response } from "express";
import { matchJob, saveJob } from "../services/job.service.js";

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

export const matchJobController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        console.log(req.body);
        const result = await matchJob(text);
        return res.json({ result });
    } catch (error) {
        console.error("Error matching job:", error);
        return res.status(500).json({ error: "Failed to match job" });
    }
}