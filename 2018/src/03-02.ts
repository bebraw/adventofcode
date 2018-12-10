import * as fs from "fs";
import { difference, rangeIterable } from "./utils";

type Area = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

const areas: Area[] = fs
  .readFileSync("./input/03.txt", "utf8")
  .split("\n")
  .map(a => {
    const parts = a.split(" ");

    return {
      id: Number(parts[0].split("#")[1]),
      x: Number(parts[2].split(",")[0]),
      y: Number(parts[2].split(",")[1].split(":")[0]),
      w: Number(parts[3].split("x")[0]),
      h: Number(parts[3].split("x")[1])
    };
  });

const foundCoordinates: { [key: string]: Area } = {};
const allAreas: Set<Area> = new Set(areas);
const duplicateAreas: Set<Area> = new Set();

areas.forEach(area => {
  for (let x of rangeIterable(area.x, area.x + area.w)) {
    for (let y of rangeIterable(area.y, area.y + area.h)) {
      const id = `${x}-${y}`;

      if (foundCoordinates[id]) {
        duplicateAreas.add(foundCoordinates[id]);
        duplicateAreas.add(area);
      }

      foundCoordinates[id] = area;
    }
  }
});

/*console.log("all", allAreas);
console.log("duplicates", duplicateAreas);*/
console.log("diff", difference(allAreas, duplicateAreas));
