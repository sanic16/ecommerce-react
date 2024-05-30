import { Router } from "express";

import {
  loginUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUserById,
} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddlware";

const router = Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUserById);
export default router;
