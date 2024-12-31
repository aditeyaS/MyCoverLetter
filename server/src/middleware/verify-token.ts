import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../const/config";
import STATUS_CODES from "../const/status-codes";
import { env } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[config.AUTH_TOKEN];
  if (!token) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Unauthorized. No token found." });
    return;
  }
  try {
    const decoded = jwt.verify(token, env.JWT_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Unauthorized. Token expired." });
    return;
  }
};
