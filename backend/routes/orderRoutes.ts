import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { admin, protect } from "../middleware/authMiddlware";

const router = Router();

router
  .route("/")
  .post(protect, orderController.addOrderItems)
  .get(protect, admin, orderController.getOrders);
router.route("/mine").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getOrderById);
router.route("/:id/pay").put(protect, orderController.updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, admin, orderController.updateOrderToDelivered);

export default router;
