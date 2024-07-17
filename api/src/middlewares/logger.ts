import { NextFunction, Response } from "express";
import { TypedRequestBody } from "../types/express-request-type";

const loggerMiddleware = (
  req: TypedRequestBody<{}>,
  res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;
