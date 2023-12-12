import { PromptNames } from "../types/custom.type";

export interface Prompt {
  type: "input" | "confirm";
  name: PromptNames;
  message: string;
}
