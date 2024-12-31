import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import Template, { TemplateType } from "../model/template";
import { VerifyToken } from "../middleware/verify-token";
import STATUS_CODES from "../const/status-codes";
import ERROR_MESSAGES from "../const/error-messages";

const templateRouter = express.Router();

templateRouter.post(
  "/",
  VerifyToken,
  [
    check("title", "Title is required").isString(),
    check("template", "Template is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();
    if (errors.length != 0) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ message: errors[0].msg });
      return;
    }
    try {
      let template: TemplateType = req.body;
      template.userId = req.userId;
      const newTemplate = new Template(template);
      await newTemplate.save();
      res.status(STATUS_CODES.OK).json({ message: "Template created" });
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES[500] });
    }
  }
);

templateRouter.get("/", VerifyToken, async (req: Request, res: Response) => {
  try {
    const userTemplates = await Template.find(
      { userId: req.userId },
      { userId: false }
    );
    res.status(STATUS_CODES.OK).json(userTemplates);
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES[500] });
  }
});

templateRouter.put(
  "/:templateId",
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const template: TemplateType = req.body;
      const updatedTemplate = await Template.findOneAndUpdate(
        {
          _id: req.params.templateId,
          userId: req.userId,
        },
        template,
        { new: true }
      );
      if (!updatedTemplate) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Invalid template" });
        return;
      }
      await updatedTemplate.save();
      res.status(STATUS_CODES.OK).json({ message: "Template updated." });
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES[500] });
    }
  }
);

templateRouter.delete(
  "/:templateId",
  VerifyToken,
  async (req: Request, res: Response) => {
    try {
      const deletedTemplate = await Template.findOneAndDelete({
        _id: req.params.templateId,
        userId: req.userId,
      });
      if (!deletedTemplate) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "Invalid template" });
        return;
      }
      res.status(STATUS_CODES.OK).json({ message: "Template deleted." });
    } catch (error) {
      console.log(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: ERROR_MESSAGES[500] });
    }
  }
);

export default templateRouter;
