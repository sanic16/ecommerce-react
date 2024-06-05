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
exports.createProductReview = exports.getTopProducts = exports.getProductById = exports.getProducts = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
    const count = yield productModel_1.default.countDocuments(Object.assign({}, keyword));
    const products = yield productModel_1.default.find(Object.assign({}, keyword))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    return res.json({ products, page: page, pages: Math.ceil(count / pageSize) });
}));
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        return res.json(product);
    }
    throw new Error("Product not found");
}));
// @desc    Get Top Rated Products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json(products);
}));
// @desc   Create a new review
// @route  POST /api/products/:id/reviews
// @access Private
exports.createProductReview = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user && r.user.toString() === req.user.id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }
        const user = yield userModel_1.default.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: new mongoose_1.default.Types.ObjectId(req.user.id),
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
        yield product.save();
        res.status(201).json({
            message: "Review added",
        });
    }
    else {
        res.status(404);
        throw new Error("Resource not found");
    }
}));
