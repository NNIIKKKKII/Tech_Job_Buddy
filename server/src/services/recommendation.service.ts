import { matchJobsByResume } from "../services/job.service.js";


export const getDailyRecommendations = async (resumeId: string) => {
    const jobs = await matchJobsByResume(resumeId);

    return {
        applyNow: jobs.filter(j => j.strategy?.decision === "Apply Now"),
        applyWithPrep: jobs.filter(j => j.strategy?.decision === "Apply with Prep"),
        skip: jobs.filter(j => j.strategy?.decision === "Skip"),
    };
};