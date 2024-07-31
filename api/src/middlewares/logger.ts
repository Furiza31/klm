import { NextFunction, Response } from "express";
import { TypedRequestBody } from "../types/express-request-type";

const loggerMiddleware = (
  req: TypedRequestBody<{}>,
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
