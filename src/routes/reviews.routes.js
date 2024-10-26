/**
 * @author : Nader
 * @description : routes for reviews
 */
import express from "express";
import Controller from "../controllers/review.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

const controller = new Controller();

router
  .route("/")
  .get(protect, controller.getAll)
  .post(protect, controller.setProductUserIds, controller.createOne);
router
  .route("/:id")
  .get(protect, controller.getOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

export default router;
