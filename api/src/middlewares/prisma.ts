import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { TypedRequest } from "../types/express-request-type";

const prisma = new PrismaClient();

export const prismaMiddleware = async (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.prisma = prisma;
    next();
  } catch (error) {
    console.error("Error in Prisma middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default prismaMiddleware;
