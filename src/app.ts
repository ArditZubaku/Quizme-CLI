import readline from "node:readline/promises";

// Duplex stream
const rl = readline.createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdout,
});

console.log("What is your name?");
const answer: string = await rl.question("What is your name?");
console.log(`Your name is ${answer}`);
const answer2: string = await rl.question("Where do you live?");
console.log(`Your location is ${answer2}`);

rl.close();

const flags: string[] = [];

process.argv.forEach((arg: string) => {
  if (arg.startsWith("--") || arg.startsWith("-")) {
    flags.push(arg.replaceAll("-", ""));
  }
});

if (flags.includes("a") || flags.includes("add")) {
  console.log("add some values");
} else {
  console.log("do some work");
}
