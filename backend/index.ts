import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5173", "http://192.168.1.35:5173"],
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// React build

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
