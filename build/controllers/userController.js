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
exports.updateUserById = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.loginUser = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({
        email,
    });
    if (user && (yield user.matchPassword(password))) {
        (0, generateToken_1.default)(res, user._id);
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 8;
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            exp: expirationTime,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
// @desc    Register a new user
// @route   POST /api/users/
// @access  public
exports.registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("El usuario ya existe");
    }
    const user = yield userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 8;
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            exp: expirationTime,
        });
    }
    else {
        res.status(400);
        throw new Error("Datos de usuario inválidos");
    }
}));
// @desc    Logout user / clear cookie
// @route   GET /api/users/logout
// @access  Private
exports.logoutUser = (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    return res.status(200).json({
        message: "Sesión cerrada",
    });
}));
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user.id);
    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("Usuario no encontrado");
    }
}));
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = yield user.save();
        return res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("Usuario no encontrado");
    }
}));
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = (0, asyncHandler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: "Get all users" });
}));
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: `Delete user ${req.params.id}` });
}));
// @desc    Get user by ID
// @route   GET /api/users/:ID
// @access  Private/Admin
exports.getUserById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: `Get user ${req.params.id}` });
}));
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUserById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ message: `Updated user ${req.params.id}` });
}));
