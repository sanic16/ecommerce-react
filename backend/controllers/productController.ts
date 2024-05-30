import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
  }
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    throw new Error("Product not found");
  }
);

// @desc    Get Top Rated Products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json(products);
  }
);
