import { Request, Response } from "express";
import { saveJob } from "../services/job.service.js";

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
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Missing title or description" });
        }

        // result is strictly inferred as { message: string }
        const result = await saveJob(title, description);

        // This works perfectly because it matches SaveJobSuccess
        return res.json(result);

    } catch (error) {
        console.error("Error saving job:", error);
        return res.status(500).json({ error: "Failed to save job" });
    }
};