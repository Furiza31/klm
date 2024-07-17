import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { TypedRequestBody } from "../types/express-request-type";

export const validatorMiddleware = (
  req: TypedRequestBody<{}>,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Invalid data" });
  }
  next();
};

export default validatorMiddleware;
