import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const valves = eData.split(/\n/).map((row) => {
  return {
    valve: row.split("Valve ")[1].split(" ")[0],
    rate: parseInt(row.split("Valve ")[1].split("rate=")[1].split(";")[0]),
    tunnels: row.split("Valve ")[1].split("valves ")[1]?.split(", ") || [
      row.split("Valve ")[1].split("valve ")[1],
    ],
  };
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log(
  "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    data    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 17 \n",
  "color: white; background: black; font-weight: bold",
  "",
  valves
);

export default () => {
  let result = 0;

  let currentValveId = "AA";
  let hasOpenedCurrent = false;
  let totalPressure = 0;
  for (let i = 0; i < 30; i++) {
    let valve = valves.find((v) => v.valve === currentValveId);
    let highestNextValveId = 0;
    let highestTotalNextValveRate = 0;
    let highestNextValveRate = 0;
    let highestNextNextValveRate = 0;
    valve.tunnels.forEach((nextValveId) => {
      let nextValve = valves.find((v) => v.valve === nextValveId);
      nextValve.tunnels.forEach((nextNextValveId) => {
        let nextNextValve = valves.find((v) => v.valve === nextNextValveId);
        if (nextNextValve.rate > highestNextNextValveRate) {
          highestNextNextValveRate = nextNextValve.rate;
        }
      });
      if (nextValve.rate > highestNextValveRate) {
        highestNextValveRate = nextValve.rate;
        if (
          highestNextNextValveRate + highestNextValveRate >
          highestTotalNextValveRate
        ) {
          highestNextValveId = nextValve.valve;
          highestTotalNextValveRate =
            highestNextNextValveRate + highestNextValveRate;
        }
      }
    });

    // debugger;

    if (
      (valve.rate < highestNextValveRate &&
        valve.rate < highestNextNextValveRate) ||
      hasOpenedCurrent
    ) {
      currentValveId = highestNextValveId;
      hasOpenedCurrent = false;
    } else {
      hasOpenedCurrent = true;
      totalPressure += valve.rate;
    }
  }

  return <div>{totalPressure}</div>;
};

// const getTotalPressureFromValve = (valveName, minutesLeft) => {
//   let maximumPressureSkippingCurrent = 0;
//   let maximumPressureOpeningCurrent = 0;
//   const valve = valves.find((v) => v.valve === valveName);
//   valve.tunnels.forEach((tunnel) => {
//     const nextValve = valves.find((v) => v.valve === tunnel);
//     if (minutesLeft > 1) {
//       let nextValveTotalPressure = getTotalPressureFromValve(
//         nextValve.valve,
//         minutesLeft - 1
//       );
//       if (nextValveTotalPressure > maximumPressureSkippingCurrent) {
//         maximumPressureSkippingCurrent = nextValveTotalPressure;
//       }
//     } else if (minutesLeft === 1) {
//       if (nextValve.rate > maximumPressureSkippingCurrent) {
//         maximumPressureSkippingCurrent = nextValve.rate;
//       }
//     }

//     if (minutesLeft > 2) {
//       let nextValveTotalPressure = getTotalPressureFromValve(
//         nextValve.valve,
//         minutesLeft - 2
//       );
//       if (nextValveTotalPressure > maximumPressureOpeningCurrent) {
//         maximumPressureOpeningCurrent = nextValveTotalPressure;
//       }
//     }
//   });

//   if (maximumPressureOpeningCurrent > maximumPressureSkippingCurrent) {
//     return maximumPressureOpeningCurrent + valve.rate;
//   } else {
//     return maximumPressureSkippingCurrent;
//   }
// };

// result = getTotalPressureFromValve("AA", 20);
