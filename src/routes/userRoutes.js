import express from "express";
import {
  login,
  signUp,
  updatePassword
} from "../controllers/authController.js";
import { restrictToAdmin, protect } from "../middleware/authMiddleware.js";
import UserController from "../controllers/userController.js";


const userController = new UserController();
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

router.use(protect);

router
  .route("/me")
  .get(userController.getMe, userController.getOne);

router
  .route("/updatePassword")
  .patch(updatePassword);

router.use(restrictToAdmin);

router.
  route("/")
  .get(userController.getAll)

router
  .route("/:id")
  .get(userController.getOne)
  .patch(userController.updateOne)
  .delete(userController.deleteOne)

export default router;
