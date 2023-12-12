import fs from "fs/promises";

try {
  const contents = await fs.readFile("src/data.json");
  console.log(JSON.parse(contents.toString()));
} catch (error) {
  console.log(error);
  process.exit(1);
}
