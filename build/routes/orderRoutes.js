"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController = __importStar(require("../controllers/orderController"));
const authMiddlware_1 = require("../middleware/authMiddlware");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(authMiddlware_1.protect, orderController.addOrderItems)
    .get(authMiddlware_1.protect, authMiddlware_1.admin, orderController.getOrders);
router.route("/mine").get(authMiddlware_1.protect, orderController.getMyOrders);
router.route("/:id").get(authMiddlware_1.protect, orderController.getOrderById);
router.route("/:id/pay").put(authMiddlware_1.protect, orderController.updateOrderToPaid);
router
    .route("/:id/deliver")
    .put(authMiddlware_1.protect, authMiddlware_1.admin, orderController.updateOrderToDelivered);
exports.default = router;
