import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/patients`);
  });
});
