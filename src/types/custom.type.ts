export type PromptNames =
  | "userAnswer"
  | "targetQuestion"
  | "targetAnswer"
  | "check";

export type Answer = {
  [K in PromptNames]: string;
};
