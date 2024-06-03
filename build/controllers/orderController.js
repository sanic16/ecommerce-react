"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    console.log(req.body);
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No hay productos en la orden");
    }
    else {
        const order = new orderModel_1.default({
            orderItems: orderItems.map((item) => (Object.assign(Object.assign({}, item), { product: item.product, _id: undefined }))),
            user: req.user.id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = yield order.save();
        res.status(201).json(createOrder);
    }
}));
exports.addOrderItems = addOrderItems;
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find({
        user: req.user.id,
    });
    return res.status(200).json(orders);
}));
exports.getMyOrders = getMyOrders;
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id).populate("user", "name email");
    if (order) {
        return res.status(200).json(order);
    }
    else {
        res.status(404);
        throw new Error("Orden no encontrada");
    }
}));
exports.getOrderById = getOrderById;
//@desc     Update order to paid
//@route    PUT /api/orders/:id/pay
//@access   Private
const updateOrderToPaid = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        const updateOrder = yield order.save();
        return res.status(200).json(updateOrder);
    }
    else {
        res.status(404);
        throw new Error("Orden no encontrada");
    }
}));
exports.updateOrderToPaid = updateOrderToPaid;
//@desc     Update order to delivered
//@route    POST /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update order to delivered");
}));
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("get orders");
}));
exports.getOrders = getOrders;
