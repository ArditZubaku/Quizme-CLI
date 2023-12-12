import inquirer from "inquirer";
import fs from "node:fs/promises";

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

async function addQuestion() {
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
      choices: ["NI", "Wales", "Scotland", "England", "Elsewhere"],
    },
  ]);

  console.log(`Your name is ${answers.name}.`);
  console.log(`You live in ${answers.live} which is in ${answers.live2}`);
}

async function askQuestion(): Promise<void> {
  const data = await fs.readFile("src/data.json");
  const parsedData = JSON.parse(data.toString());

  const { question, answer } = parsedData[0];

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "useranswer",
      message: question,
    },
  ]);

  if (answers.useranswer === answer) {
    console.log("That's right!");
  } else {
    console.log("Not this time");
  }
}
