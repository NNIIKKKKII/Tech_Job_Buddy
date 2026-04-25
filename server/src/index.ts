import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import jobRoutes from "./routes/job.routes.js";
import ragRoutes from "./routes/rag.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


//ROUTES
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/rag", ragRoutes);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});