import express from "express";
import {
    getAllProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct
} from "../controllers/productController.js";
import { protect, restrictToAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, restrictToAdmin(), createProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(protect, restrictToAdmin(), deleteProduct);

export default router;
