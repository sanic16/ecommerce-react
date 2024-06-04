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
exports.getTopProducts = exports.getProductById = exports.getProducts = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const productModel_1 = __importDefault(require("../models/productModel"));
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = yield productModel_1.default.countDocuments();
    const products = yield productModel_1.default.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page: page, pages: Math.ceil(count / pageSize) });
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
