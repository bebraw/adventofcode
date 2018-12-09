import * as fs from "fs";

const numbers = fs
  .readFileSync("./input/01.txt", "utf8")
  .split("\n")
  .map(Number);
const result = numbers.reduce((a, b) => a + b, 0);

console.log(result);
