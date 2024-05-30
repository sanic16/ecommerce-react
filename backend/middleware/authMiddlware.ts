import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";

// @desc    Protect routes
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check if token is in the header
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string;
          isAdmin?: boolean;
        };
        const user = await User.findById(decoded.userId).select("-password");
        req.user = { id: user?._id as string, isAdmin: decoded.isAdmin };
        return next();
      } catch (error) {
        console.error(error);
        throw new Error("No autorizado, token no válido o expirado");
      }
    } else {
      res.status(401);
      throw new Error("No autorizado, token no encontrado");
    }
  }
);
