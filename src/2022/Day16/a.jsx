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

export default () => {
  const getMaximumPressureForMoveAmount = (valveName, nrOfForwardMoves) => {
    let maximumPressureOpeningCurrent = 0;
    const valve = valves.find((v) => v.valve === valveName);
    valve.tunnels.forEach((tunnel) => {
      const nextValve = valves.find((v) => v.valve === tunnel);

      if (nrOfForwardMoves > 1) {
        let nextValveTotalPressure = getMaximumPressureForMoveAmount(
          nextValve.valve,
          nrOfForwardMoves - 1
        );
        if (nextValveTotalPressure > maximumPressureOpeningCurrent) {
          maximumPressureOpeningCurrent = nextValveTotalPressure;
        }
      }
    });

    return maximumPressureOpeningCurrent + valve.rate;
  };

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

// result = getMaximumPressureForMoveAmount("AA", 20);
