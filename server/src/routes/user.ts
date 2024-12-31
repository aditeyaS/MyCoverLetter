import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import User from "../model/user";
import STATUS_CODES from "../const/status-codes";
import ERROR_MESSAGES from "../const/error-messages";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    check("email", "Email is required").isString(),
    check("password", "Password is required and minimum length 8").isLength({
      min: 8,
    }),
    check("name", "First Name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();
    if (errors.length != 0) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: errors[0].msg });
      return;
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Email already exists." });
        return;
      }
      const newUser = new User(req.body);
      await newUser.save();
      res.status(STATUS_CODES.OK).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES[500] });
    }
  }
);

export default userRouter;
