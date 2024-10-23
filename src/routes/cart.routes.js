/**
 * @author : Nader
 * @description : routes for cart
 */
import express from "express";
import Controller from "../controllers/cart.controller.js";
import { protect,  } from "../middleware/authMiddleware.js";

const router = express.Router();
const controller = new Controller();

router
    .route("/")
    .get(protect,controller.getAll)
    .post(protect, controller.createProduct);
router
    .route("/:id")
    .get(protect,controller.getOne)
    .put(protect,controller.updateOne)
    .delete(protect, controller.deleteOne);

export default router;


