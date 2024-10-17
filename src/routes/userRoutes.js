import express from "express";
import {
  login,
  logout,
  getUserProfile,
  signUp,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.post("/login", login);
router.post("/logout", logout);
// router.route('/profile').get(protect, getUserProfile)

export default router;
