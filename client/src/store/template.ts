import { create } from "zustand";
import Template from "@/models/template";

type Store = {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  template: Template | null;
  selectTemplate: (template: Template) => void;
};

const useTemplate = create<Store>()((set) => ({
  templates: [],
  setTemplates: (templates) => set({ templates }),
  template: null,
  selectTemplate: (template) => set({ template }),
}));

export default useTemplate;
