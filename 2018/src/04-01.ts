import * as fs from "fs";
import { differenceInMinutes } from "date-fns";
import { countBy, toPairs } from "lodash";

enum Operation {
  BEGINS_SHIFT = "begins_shift",
  FALLS_ASLEEP = "falls_asleep",
  WAKES_UP = "wakes_up"
}
type Session = {
  guard: number;
  operation?: Operation;
  timestamp: Date;
};

let previousGuard: Session["guard"];
const sessions: Session[] = fs
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

    const date = {
      Y: Number(parts[0].split("-")[0].split("[")[1]),
      M: Number(parts[0].split("-")[1]),
      D: Number(parts[0].split("-")[2]),
      h: Number(parts[1].split(":")[0]),
      m: Number(parts[1].split(":")[1].split("]")[0])
    };

    return {
      guard,
      operation,
      timestamp: new Date(date.Y, date.M, date.D, date.h, date.m)
    };
  })
  .sort(
    (a, b) =>
      Date.parse(a.timestamp.toString()) - Date.parse(b.timestamp.toString())
  );

// TODO: Note that multiple guards may be sleeping at once
let sleepingTime: Date;
const sleepingTimes: {
  [key: string]: {
    id: Session["guard"];
    total: number;
    times: number[];
  };
} = {};
sessions.forEach(({ guard, operation, timestamp }) => {
  switch (operation) {
    case Operation.BEGINS_SHIFT:
      previousGuard = guard;
      break;
    case Operation.FALLS_ASLEEP:
      sleepingTime = timestamp;
      break;
    case Operation.WAKES_UP:
      if (!sleepingTimes[guard]) {
        sleepingTimes[guard] = {
          id: guard,
          total: 0,
          times: []
        };
      }

      const time = differenceInMinutes(timestamp, sleepingTime);
      sleepingTimes[guard] = {
        id: sleepingTimes[guard].id,
        total: sleepingTimes[guard].total + time,
        times: sleepingTimes[guard].times.concat(time)
      };

      break;
  }
});

const mostAsleep = Object.values(sleepingTimes).sort(
  (a, b) => b.total - a.total
)[0];
const mostCommonSleepingTime = toPairs(countBy(mostAsleep.times)).sort(
  (a, b) => b[1] - a[1]
);

console.log(mostAsleep.id * Number(mostCommonSleepingTime[0][0]));
