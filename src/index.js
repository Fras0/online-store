import express from "express";
import connectDB from "./Config/connectDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import campaginsRoutes from "./routes/campagins.routes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/campagins", campaginsRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started @ port ${PORT} ✅`);
});
