import * as fs from "fs";

type Area = {
  x: number;
  y: number;
  w: number;
  h: number;
};
type Record = { [key: string]: boolean };

const areas: Area[] = fs
  .readFileSync("./input/03.txt", "utf8")
  .split("\n")
  .map(a => {
    const parts = a.split(" ");

    return {
      x: Number(parts[2].split(",")[0]),
      y: Number(parts[2].split(",")[1].split(":")[0]),
      w: Number(parts[3].split("x")[0]),
      h: Number(parts[3].split("x")[1])
    };
  });

const foundCoordinates: Record = {};
const duplicateCoordinates: Record = {};
const rangeIterable = (min: number, max: number) => ({
  *[Symbol.iterator]() {
    let rangeIterator = range(min, max);
    let rangeResult = rangeIterator.next();

    while (!rangeResult.done) {
      yield rangeResult.value;

      rangeResult = rangeIterator.next();
    }
  }
});

areas.forEach(area => {
  for (let x of rangeIterable(area.x, area.x + area.w)) {
    for (let y of rangeIterable(area.y, area.y + area.h)) {
      const id = `${x}-${y}`;

      if (foundCoordinates[id]) {
        duplicateCoordinates[id] = true;
      }

      foundCoordinates[id] = true;
    }
  }
});

console.log(Object.keys(duplicateCoordinates).length);

function* range(min: number, max: number) {
  let current = min;

  while (current < max) {
    yield current;

    current++;
  }
}
