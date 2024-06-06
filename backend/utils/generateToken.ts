import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "8h" }
  );

  res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 1000 * 60,
    secure: false,
    sameSite: "strict",
  });
};

export default generateToken;
