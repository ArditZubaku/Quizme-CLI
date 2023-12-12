export type PromptNames =
  | "userAnswer"
  | "targetQuestion"
  | "targetAnswer"
  | "check";

export type Answer = {
  [K in PromptNames]: string;
};

export type Options = {
  type: "boolean" | "string";
  short?: string;
  multiple?: boolean;
};
