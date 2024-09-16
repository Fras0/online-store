import express from "express";
import connectDB from "./Config/connectDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

import {createSessionConfig} from "./Config/session.js";

import expressSession from "express-session";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started @ port ${PORT} ✅`);
});
