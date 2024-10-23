/**
 * @author : Nader
 * @description : routes for orders
 */
import express from "express";
import Controller from "../controllers/order.controller.js";
import { protect,  } from "../middleware/authMiddleware.js";

const router = express.Router();
const controller = new Controller();

router
    .route("/")
    .get(protect,controller.getAll)
    .post(protect, controller.createOne);
router
    .route("/:id")
    .get(protect,controller.getOne)
    .put(protect,controller.updateOne)
    .delete(protect, controller.deleteOne);

export default router;


