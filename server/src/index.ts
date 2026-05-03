import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import jobRoutes from "./routes/job.routes.js";
import ragRoutes from "./routes/rag.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


//ROUTES
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rag", ragRoutes); // for resume explanations
app.use("/api/application", applicationRoutes); // for cover letter
app.use("/api/recommendation", recommendationRoutes);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});