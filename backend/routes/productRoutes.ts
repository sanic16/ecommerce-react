import { Router } from "express";
import {
  getProducts,
  getProductById,
  getTopProducts,
  createProductReview,
} from "../controllers/productController";
import { protect } from "../middleware/authMiddlware";

const router = Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, createProductReview);
export default router;
