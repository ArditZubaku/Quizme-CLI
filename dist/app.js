import readline from "node:readline/promises";
const rl = readline.createInterface({
    terminal: true,
    input: process.stdin,
    output: process.stdout,
});
console.log("What is your name?");
const answer = await rl.question("What is your name?");
console.log(`Your name is ${answer}`);
const answer2 = await rl.question("Where do you live?");
console.log(`Your location is ${answer2}`);
rl.close();
const flags = [];
process.argv.forEach((arg) => {
    if (arg.startsWith("--") || arg.startsWith("-")) {
        flags.push(arg.replaceAll("-", ""));
    }
});
if (flags.includes("a") || flags.includes("add")) {
    console.log("add some values");
}
else {
    console.log("do some work");
}
//# sourceMappingURL=app.js.map