import inquirer from "inquirer";
import fs from "node:fs/promises";

const FILE_PATH = "src/data.json";

interface Data {
  id: number;
  question: string;
  answer: string;
  lastAnsweredCorrect?: boolean;
  lastAsked?: string;
}

type PromptNames = "userAnswer" | "targetQuestion" | "targetAnswer";

interface Prompt {
  type: "input";
  name: PromptNames | string;
  message: string;
}

type Answers = {
  [K in PromptNames]: string;
};

const flags: string[] = [];

process.argv.forEach((arg: string) => {
  if (arg.startsWith("--") || arg.startsWith("-")) {
    flags.push(arg.replaceAll("-", ""));
  }
});

if (flags.includes("a") || flags.includes("add")) {
  addQuestion();
} else {
  askQuestion();
}

async function addQuestion(): Promise<void> {
  // - Start a dialogue
  console.log("Hello, let's add a new question!");

  // - Ask me for a question
  const prompt1: Prompt = {
    type: "input",
    name: "targetQuestion",
    message: "What is your question?",
  };

  // - Ask me for the answer
  const prompt2: Prompt = {
    type: "input",
    name: "targetAnswer",
    message: "What is your answer?",
  };

  const responses: Answers = await inquirer.prompt([prompt1, prompt2]);

  console.log(responses);

  // - Store for future uses
  const data: Buffer = await fs.readFile(FILE_PATH);
  const parsedData: Data[] = JSON.parse(data.toString());

  parsedData.push({
    id: getID(parsedData),
    question: responses.targetQuestion,
    answer: responses.targetAnswer,
  });

  // TODO: Optimize this
  await fs.truncate(FILE_PATH);
  await fs.appendFile(FILE_PATH, JSON.stringify(parsedData));
}

async function askQuestion(): Promise<void> {
  const data: Buffer = await fs.readFile(FILE_PATH);
  const parsedData: Data[] = JSON.parse(data.toString());

  // const target: Data = parsedData[0];
  const target: Data =
    parsedData[Math.floor(Math.random() * parsedData.length)];

  const { question, answer } = target;

  const prompt: Prompt = {
    type: "input",
    name: "useranswer",
    message: question,
  };

  const answers: Answers = await inquirer.prompt([prompt]);

  target.lastAnsweredCorrect = checkAnswer(answers.userAnswer, answer);
  target.lastAsked = new Date().toUTCString();

  const newData: Data[] = parsedData.filter((item) => item.id !== target.id);

  newData.push(target);

  await fs.writeFile(FILE_PATH, JSON.stringify(newData));
}

function checkAnswer(input: string, answer: string): boolean {
  if (input === answer) {
    console.log("You got it right!");
    return true;
  } else {
    console.log("You got it wrong!");
    return false;
  }
}

function getID(data: Data[]) {
  return Math.max(...data.map((item) => item.id)) + 1;
}

/*
async function test() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "live",
      message: "Where do you live?",
    },
    {
      type: "list",
      name: "live2",
      message: "Where do you live?",
      choices: ["NI", "Wales", "Scotland", "England", "Kosovo", "Elsewhere"],
    },
  ]);

  console.log(`Your name is ${answers.name}.`);
  console.log(`You live in ${answers.live} which is in ${answers.live2}`);
}
*/
