import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


//ROUTES
app.use("/api/resume", resumeRoutes);



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});