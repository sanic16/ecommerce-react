import { Router } from "express";
import {
  getProducts,
  getProductById,
  getTopProducts,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);

export default router;
