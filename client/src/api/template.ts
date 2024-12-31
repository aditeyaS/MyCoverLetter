import { TemplateForm } from "@/app/routes/app/new";
import { env } from "@/config/env";
import Template from "@/models/template";

const BASE_URL = env.API_URL;
const TEMPLATE_BASE_URL = `${BASE_URL}/api/template`;

export const create = async (data: TemplateForm) => {
  const response = await fetch(`${TEMPLATE_BASE_URL}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getAllTemplates = async (): Promise<Template[]> => {
  const response = await fetch(`${TEMPLATE_BASE_URL}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

type UpdateTemplateModel = {
  templateId: string;
  data: TemplateForm;
};
export const updateTemplate = async (data: UpdateTemplateModel) => {
  const response = await fetch(`${TEMPLATE_BASE_URL}/${data.templateId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const deleteTemplate = async (templateId: string) => {
  const response = await fetch(`${TEMPLATE_BASE_URL}/${templateId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
