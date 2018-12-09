import * as fs from "fs";

enum Operation {
  BEGINS_SHIFT = "begins_shift",
  FALLS_ASLEEP = "falls_asleep",
  WAKES_UP = "wakes_up"
}
type Time = {
  Y: number;
  M: number;
  D: number;
  h: number;
  m: number;
  guard: number;
  operation?: Operation;
};

let previousGuard: Time["guard"];
const times: Time[] = fs
  .readFileSync("./input/04.txt", "utf8")
  .split("\n")
  .map(a => {
    const parts = a.split(" ");
    const message = parts.slice(2).join(" ");
    let guard = previousGuard;
    let operation;

    if (message.includes("Guard")) {
      guard = Number(message.split(" ")[1].split("#")[1]);
      previousGuard = guard;
      operation = Operation.BEGINS_SHIFT;
    } else if (message.includes("falls asleep")) {
      operation = Operation.FALLS_ASLEEP;
    } else if (message.includes("wakes up")) {
      operation = Operation.WAKES_UP;
    }

    return {
      Y: Number(parts[0].split("-")[0].split("[")[1]),
      M: Number(parts[0].split("-")[1]),
      D: Number(parts[0].split("-")[2]),
      h: Number(parts[1].split(":")[0]),
      m: Number(parts[1].split(":")[1].split("]")[0]),
      guard,
      operation
    };
  });

console.log(times);

/*times.forEach(time => {
    // TODO: Track sleeping now
})*/
