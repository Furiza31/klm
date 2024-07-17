import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T & {
    user?: Partial<User>;
    prisma: PrismaClient;
  };
}
