import type { Request, Response } from "express";
import Order from "../models/orderModel";
import asyncHandler from "../middleware/asyncHandler";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body as Payment;
  console.log(req.body);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No hay productos en la orden");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item.product,
        _id: undefined,
      })),
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({
    user: req.user.id,
  });

  return res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Orden no encontrada");
  }
});

//@desc     Update order to paid
//@route    PUT /api/orders/:id/pay
//@access   Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    return res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Orden no encontrada");
  }
});

//@desc     Update order to delivered
//@route    POST /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = asyncHandler(
  async (_req: Request, res: Response) => {
    res.send("update order to delivered");
  }
);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (_req: Request, res: Response) => {
  res.send("get orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
