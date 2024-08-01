import { NextFunction, Response } from "express";
import { TypedRequest } from "../types/express-request-type";

const loggerMiddleware = (
  req: TypedRequest<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  console.log("-".repeat(50));
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url}\nUser ID: ${
      req.body.user?.id
    }\nUser agent: ${req.headers["user-agent"]}`
  );
  console.log("-".repeat(50));

  next();
};

export default loggerMiddleware;
