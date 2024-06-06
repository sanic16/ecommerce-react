"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({
        userId: userId,
    }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: 1000 * 60,
        secure: false,
        sameSite: "strict",
    });
};
exports.default = generateToken;
