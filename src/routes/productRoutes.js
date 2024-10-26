import express from "express";
import ProductController from "../controllers/productController.js";
import { protect, restrictToAdmin } from "../middleware/authMiddleware.js";
import reviewRouter from "../routes/reviews.routes.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);
const productController = new ProductController();

router
  .route("/")
  .get(productController.getAll)
  .post(protect, restrictToAdmin, productController.createProduct);
router
  .route("/:id")
  .get(productController.getOne)
  .patch(productController.updateOne)
  .delete(protect, restrictToAdmin, productController.deleteOne);

export default router;
