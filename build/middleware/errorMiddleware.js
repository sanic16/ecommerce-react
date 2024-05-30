"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (error, _req, res, _next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
    if (error.name === "CastError") {
        statusCode = 404;
        message = "Resource not found";
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack || "🥞",
    });
};
exports.errorHandler = errorHandler;
