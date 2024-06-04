import type { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";
import User from "../models/userModel";
import mongoose from "mongoose";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 1;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page: page, pages: Math.ceil(count / pageSize) });
});

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

// @desc   Create a new review
// @route  POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user && r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: new mongoose.Types.ObjectId(req.user.id),
    };

    product.reviews.push(review as any);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
