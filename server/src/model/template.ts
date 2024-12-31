import mongoose from "mongoose";

export type TemplateType = {
  _id: string;
  title: string;
  template: string;
  userId: string;
};

const templateSchema = new mongoose.Schema<TemplateType>({
  title: { type: String, required: true },
  template: { type: String, required: true },
  userId: { type: String, required: true },
});

const Template = mongoose.model<TemplateType>("template", templateSchema);

export default Template;
