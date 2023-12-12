export interface Data {
  id: number;
  question: string;
  answer: string;
  lastAnsweredCorrect?: boolean;
  lastAsked?: string;
}
