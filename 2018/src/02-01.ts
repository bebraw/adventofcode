import * as fs from "fs";

const words = fs.readFileSync("./input/02.txt", "utf8").split("\n");

const letterTwoTimes = letterNTimes(2);
const letterThreeTimes = letterNTimes(3);

const letterTwos = words.map(letterTwoTimes).filter(Boolean).length;
const letterThrees = words.map(letterThreeTimes).filter(Boolean).length;

console.log(letterTwos, letterThrees, letterTwos * letterThrees);

function letterNTimes(n: number) {
  return (str: string) =>
    Object.values(
      str
        .split("")
        .sort()
        .reduce(
          (acc: { [key: string]: string }, a: string) => ({
            ...acc,
            [a]: acc[a] ? acc[a] + 1 : 1
          }),
          {}
        )
    ).includes(n);
}
