import * as fs from "fs";

const numbers = fs
  .readFileSync("./input/01.txt", "utf8")
  .split("\n")
  .map(Number);
const seenFrequencies: { [key: string]: boolean } = { "0": true };
let firstOneTwice = null;

function* cyclic(numbers: number[]) {
  const len = numbers.length;

  for (let i = 0; true; i++) {
    yield numbers[i % len];
  }
}

const cycle = cyclic(numbers);
let currentFrequency = 0;

while (true) {
  const currentChange = cycle.next().value;
  currentFrequency += currentChange;

  if (seenFrequencies[currentFrequency.toString()] && !firstOneTwice) {
    console.log("matched to", currentFrequency);
    break;
  }

  seenFrequencies[currentFrequency] = true;
}
