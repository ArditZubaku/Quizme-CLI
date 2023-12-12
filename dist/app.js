"use strict";
console.log(process.argv);
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