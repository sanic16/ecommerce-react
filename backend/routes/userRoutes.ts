import { Router } from "express";

import {
  loginUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddlware";

const router = Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
