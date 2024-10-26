import express from "express";
import connectDB from "./Config/connectDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import campaginsRoutes from "./routes/campagins.routes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

import cartRoutes from "./routes/cart.routes.js";
import categoriesRoutes from "./routes/campagins.routes.js";
import ordersRoues from "./routes/orders.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";


const PORT = process.env.PORT || 5000;
// Convert import.meta.url to __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();
const app = express();

// use the json formatting
app.use(express.json());
// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

/**************************** frontend ***************/
// some views
app.get("/", (req, res) => {
  res.send("API is running...");
});

// dashboard
app.get("/dashboard", (req, res) => {
  res.render('index'); 

});


/************** API Routes *************************/
app.use("/api/users", userRoutes);
app.use("/api/campagins", campaginsRoutes);
app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoues);
app.use("/api/reviews", reviewsRoutes);



app.listen(PORT, () => {
  console.log(`Server Started @ port ${PORT} ✅`);
});
