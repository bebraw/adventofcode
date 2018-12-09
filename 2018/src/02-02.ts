import * as fs from "fs";

type Word = {
  distance: number;
  word?: string;
  match?: string;
};

//const testWords = 'abcde,fghij,klmno,pqrst,fguij,axcye,wvxyz'.split(',').map(a => a.split(''));
const words: string[][] = fs
  .readFileSync("./input/02.txt", "utf8")
  .split("\n")
  .map(a => a.split(""));

let shortest = { distance: words[0].length };
const distances = words.slice(0, -1).map(
  word =>
    words
      .map(w =>
        word !== w
          ? {
              distance: distanceTo(word, w),
              word: word.filter((l, i) => l === w[i]).join(""),
              match: w.join("")
            }
          : {
              distance: word.length,
              word: w
            }
      )
      .sort((a, b) => a.distance - b.distance)[0]
);

console.log(
  shortest,
  distances
    .map(a => a.distance)
    .sort((a: Word["distance"], b: Word["distance"]) => a - b)[0]
);

// Assumes strings have the same length
function distanceTo(a: string[], b: string[]): number {
  return a.filter((n, i) => n !== b[i]).length;
}
