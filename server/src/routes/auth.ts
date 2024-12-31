import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../model/user";
import STATUS_CODES from "../const/status-codes";
import config from "../const/config";
import ERROR_MESSAGES from "../const/error-messages";
import { VerifyToken } from "../middleware/verify-token";
import { env } from "../config";

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "Email is required").isString(),
    check("password", "Password is required and minimum length 8").isLength({
      min: 8,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();
    if (errors.length != 0) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: errors[0].msg });
      return;
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Invalid credentials" });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign({ userId: user._id }, env.JWT_KEY, {
        expiresIn: "7d",
      });
      res.cookie(config.AUTH_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      const userResponse = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      res.status(STATUS_CODES.OK).json(userResponse);
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES[500] });
    }
  }
);

authRouter.get("/verify", VerifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
      return;
    }
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    res.status(STATUS_CODES.OK).json(userResponse);
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES[500] });
  }
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.cookie(config.AUTH_TOKEN, "", { expires: new Date(0) });
  res.status(STATUS_CODES.OK).json({ message: "Logout successful" });
});

export default authRouter;
