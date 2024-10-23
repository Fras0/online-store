import express from "express";
import connectDB from "./Config/connectDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import campaginsRoutes from "./routes/campagins.routes.js";
import productRoutes from "./routes/productRoutes.js";

import cartRoutes from "./routes/cart.routes.js";
import categoriesRoutes from "./routes/campagins.routes.js";
import ordersRoues from "./routes/orders.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";

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

app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoues);
app.use("/api/reviews", reviewsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started @ port ${PORT} ✅`);
});
