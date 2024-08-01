import { User } from "@prisma/client";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { TypedRequest } from "../types/express-request-type";

const publicRoutes = ["/", "/health", "/auth/login", "/auth/register"];

export const generateToken = (user: User | Partial<User>) => {
  user = safeUser(user);
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION as string,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const safeUser = (user: User | Partial<User>) => {
  const userCopy = { ...user } as Partial<User>;
  delete userCopy.password;
  return userCopy;
};

export const auth = async (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  if (publicRoutes.includes(req.path)) return next();
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = safeUser(decoded as User);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
