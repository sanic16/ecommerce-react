"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "development") {
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ["http://localhost:5173", "http://192.168.1.35:5173"],
    }));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/users", userRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.get("/api/config/paypal", (_req, res) => {
    res.send({
        clientId: process.env.PAYPAL_CLIENT_ID,
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "/react")));
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/react/index.html"));
});
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
