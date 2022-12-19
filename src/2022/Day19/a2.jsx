import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const INITIAL_MOVE_NR = 0;
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const blueprints = eData.split(/\n/).map((row) => {
  return {
    oreRobot: { ore: parseInt(row.split(" ")[6]) },
    clayRobot: { ore: parseInt(row.split(" ")[12]) },
    obsidianRobot: {
      ore: parseInt(row.split(" ")[18]),
      clay: parseInt(row.split(" ")[21]),
    },
    geodeRobot: {
      ore: parseInt(row.split(" ")[27]),
      obsidian: parseInt(row.split(" ")[30]),
    },
  };
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export default () => {
  let currMove = 0;

  const totalNrOfMoves = 99999999999999999999999999;

  const [moveNr, setMoveNr] = useState(INITIAL_MOVE_NR);
  const moveNrRef = React.useRef(moveNr);
  moveNrRef.current = moveNr;

  const startPlaying = () => {
    if (moveNr < totalNrOfMoves) {
      const timer = setInterval(() => {
        moveNrRef.current < totalNrOfMoves
          ? setMoveNr(moveNrRef.current + 1)
          : clearInterval(timer);
      }, 30);
    }
  };

  // *********************************************************************************

  let result = 0;

  let blueprint1 = blueprints[0];

  let oreRobots = 1;
  let clayRobots = 0;
  let obsidianRobots = 0;
  let geodeRobots = 0;
  let ores = 0;
  let clays = 0;
  let obsidians = 0;
  let geodes = 0;

  let isBuildingOreRobot = false;
  let isBuildingClayRobot = false;
  let isBuildingObsidianRobot = false;
  let isBuildingGeodeRobot = false;

  let minToBuildOreRobot;
  let minToBuildClayRobot;
  let minLeft;
  let maxClay;
  let maxClayIfBuildingOreRobot;

  const checkShouldBuildOreRobotNext = (i, bpNr) => {
    // Build 1 ore robot and after that build only clay robots
    let newTimeLeft = 24 - i;
    let newOres = ores;
    let newClays = clays;
    let newIsBuildingOreRobot = false;
    let newIsBuildingClayRobot = false;
    let newOreRobots = oreRobots;
    let newClayRobots = clayRobots;
    let newHasBuildOreRobot = false;
    while (newTimeLeft > 0) {
      if (newOres >= blueprints[bpNr].oreRobot.ore && !newHasBuildOreRobot) {
        newIsBuildingOreRobot = true;
        newOres -= blueprints[bpNr].clayRobot.ore;
        newHasBuildOreRobot = true;
      } else if (
        newOres >= blueprints[bpNr].clayRobot.ore &&
        newHasBuildOreRobot
      ) {
        newIsBuildingClayRobot = true;
        newOres -= blueprints[bpNr].clayRobot.ore;
      }

      for (let i = 0; i < newOreRobots; i++) {
        newOres++;
      }
      for (let i = 0; i < newClayRobots; i++) {
        newClays++;
      }

      if (newIsBuildingOreRobot) {
        newOreRobots++;

        newIsBuildingOreRobot = false;
      }
      if (newIsBuildingClayRobot) {
        newClayRobots++;

        newIsBuildingClayRobot = false;
      }

      newTimeLeft--;
    }

    // Build clay robots all the way
    let newTimeLeft2 = 24 - i;
    let newOres2 = ores;
    let newClays2 = clays;
    let newIsBuildingClayRobot2 = false;
    let newOreRobots2 = oreRobots;
    let newClayRobots2 = clayRobots;
    while (newTimeLeft2 > 0) {
      if (newOres2 >= blueprints[bpNr].clayRobot.ore) {
        newIsBuildingClayRobot2 = true;
        newOres2 -= blueprints[bpNr].clayRobot.ore;
      }

      for (let i = 0; i < newOreRobots2; i++) {
        newOres2++;
      }
      for (let i = 0; i < newClayRobots2; i++) {
        newClays2++;
      }

      if (newIsBuildingClayRobot2) {
        newClayRobots2++;

        newIsBuildingClayRobot2 = false;
      }

      newTimeLeft2--;
    }

    if (newClays2 < newClays) {
      return true;
    }

    return false;
  };

  const checkShouldBuildClayRobotNext = (i, bpNr) => {
    // Build 1 clay robot and after that build only obsidian robots
    let newTimeLeft = 24 - i;
    let newOres = ores;
    let newClays = clays;
    let newObsidians = obsidians;
    let newIsBuildingClayRobot = false;
    let newIsBuildingObsidianRobot = false;
    let newOreRobots = oreRobots;
    let newClayRobots = clayRobots;
    let newObsidianRobots = obsidianRobots;
    let newHasBuiltClayRobot = false;
    while (newTimeLeft > 0) {
      if (newOres >= blueprints[bpNr].oreRobot.ore && !newHasBuiltClayRobot) {
        newIsBuildingClayRobot = true;
        newOres -= blueprints[bpNr].obsidianRobot.ore;
        newHasBuiltClayRobot = true;
      } else if (
        newOres >= blueprints[bpNr].obsidianRobot.ore &&
        newClays >= blueprints[bpNr].obsidianRobot.clay &&
        newHasBuiltClayRobot
      ) {
        newIsBuildingObsidianRobot = true;
        newOres -= blueprints[bpNr].obsidianRobot.ore;
      }

      for (let i = 0; i < newOreRobots; i++) {
        newOres++;
      }
      for (let i = 0; i < newClayRobots; i++) {
        newClays++;
      }
      for (let i = 0; i < newObsidianRobots; i++) {
        newObsidians++;
      }

      if (newIsBuildingClayRobot) {
        newClayRobots++;

        newIsBuildingClayRobot = false;
      }
      if (newIsBuildingObsidianRobot) {
        newObsidianRobots++;

        newIsBuildingObsidianRobot = false;
      }

      newTimeLeft--;
    }

    // Build obsidian robots all the way
    let newTimeLeft2 = 24 - i;
    let newOres2 = ores;
    let newClays2 = clays;
    let newObsidians2 = obsidians;
    let newIsBuildingObsidianRobot2 = false;
    let newOreRobots2 = oreRobots;
    let newClayRobots2 = clayRobots;
    let newObsidianRobots2 = obsidianRobots;
    while (newTimeLeft2 > 0) {
      if (
        newOres2 >= blueprints[bpNr].obsidianRobot.ore &&
        newClays2 >= blueprints[bpNr].obsidianRobot.clay
      ) {
        newIsBuildingObsidianRobot2 = true;
        newOres2 -= blueprints[bpNr].obsidianRobot.ore;
      }

      for (let i = 0; i < newOreRobots2; i++) {
        newOres2++;
      }

      for (let i = 0; i < newClayRobots2; i++) {
        newClays2++;
      }
      for (let i = 0; i < newObsidianRobots2; i++) {
        newObsidians2++;
      }

      if (newIsBuildingObsidianRobot2) {
        newObsidianRobots2++;

        newIsBuildingObsidianRobot2 = false;
      }

      newTimeLeft2--;
    }

    if (newObsidians2 < newObsidians) {
      return true;
    }

    return false;
  };

  const checkShouldBuildObsidianRobotNext = (i, bpNr) => {
    // Build 1 obsidian robot and after that build only geode robots
    let newTimeLeft = 24 - i;
    let newOres = ores;
    let newClays = clays;
    let newObsidians = obsidians;
    let newGeodes = geodes;
    let newIsBuildingClayRobot = false;
    let newIsBuildingObsidianRobot = false;
    let newIsBuildingGeodeRobot = false;
    let newOreRobots = oreRobots;
    let newClayRobots = clayRobots;
    let newGeodeRobots = geodeRobots;
    let newObsidianRobots = obsidianRobots;
    let newHasBuiltObsidianRobot = false;
    while (newTimeLeft > 0) {
      if (
        newOres >= blueprints[bpNr].obsidianRobot.ore &&
        newClays >= blueprints[bpNr].obsidianRobot.clay &&
        !newHasBuiltObsidianRobot
      ) {
        newIsBuildingObsidianRobot = true;
        newOres -= blueprints[bpNr].obsidianRobot.ore;
        newHasBuiltObsidianRobot = true;
      } else if (
        newOres >= blueprints[bpNr].geodeRobot.ore &&
        newObsidians >= blueprints[bpNr].geodeRobot.obsidian &&
        newHasBuiltObsidianRobot
      ) {
        newIsBuildingGeodeRobot = true;
        newOres -= blueprints[bpNr].geodeRobot.ore;
      }

      for (let i = 0; i < newOreRobots; i++) {
        newOres++;
      }
      for (let i = 0; i < newClayRobots; i++) {
        newClays++;
      }
      for (let i = 0; i < newObsidianRobots; i++) {
        newObsidians++;
      }
      for (let i = 0; i < newGeodeRobots; i++) {
        newGeodes++;
      }

      if (newIsBuildingClayRobot) {
        newClayRobots++;

        newIsBuildingClayRobot = false;
      }
      if (newIsBuildingObsidianRobot) {
        newObsidianRobots++;

        newIsBuildingObsidianRobot = false;
      }
      if (newIsBuildingGeodeRobot) {
        newObsidianRobots++;

        newIsBuildingObsidianRobot = false;
      }

      newTimeLeft--;
    }

    // Build geode robots all the way
    let newTimeLeft2 = 24 - i;
    let newOres2 = ores;
    let newClays2 = clays;
    let newObsidians2 = obsidians;
    let newGeodes2 = geodes;
    let newIsBuildingObsidianRobot2 = false;
    let newIsBuildingGeodeRobot2 = false;
    let newOreRobots2 = oreRobots;
    let newClayRobots2 = clayRobots;
    let newObsidianRobots2 = obsidianRobots;
    let newGeodeRobots2 = geodeRobots;
    while (newTimeLeft2 > 0) {
      if (
        newOres2 >= blueprints[bpNr].geodeRobot.ore &&
        newObsidians2 >= blueprints[bpNr].geodeRobot.obsidian
      ) {
        newIsBuildingGeodeRobot2 = true;
        newOres2 -= blueprints[bpNr].geodeRobot.ore;
      }

      for (let i = 0; i < newOreRobots2; i++) {
        newOres2++;
      }
      for (let i = 0; i < newClayRobots2; i++) {
        newClays2++;
      }
      for (let i = 0; i < newObsidianRobots2; i++) {
        newObsidians2++;
      }
      for (let i = 0; i < newGeodeRobots2; i++) {
        newGeodes2++;
      }

      if (newIsBuildingGeodeRobot2) {
        newObsidianRobots2++;

        newIsBuildingObsidianRobot2 = false;
      }

      newTimeLeft2--;
    }

    if (newGeodes2 < newGeodes) {
      return true;
    }

    return false;
  };

  let specificBlueprint = 1;
  // for(let bpNr = 0; bpNr < blueprints.length; bpNr++) {
  for (let bpNr = specificBlueprint; bpNr < specificBlueprint + 1; bpNr++) {
    minToBuildOreRobot = blueprints[bpNr].oreRobot.ore / oreRobots;
    minToBuildClayRobot = blueprints[bpNr].clayRobot.ore / oreRobots;

    minLeft = 24 - moveNr;

    for (let i = 0; i < moveNr; i++) {
      // debugger;

      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          checkShouldBuildClayRobotNext()    \x1b[8m\x1b[40m\x1b[0m%c a2.jsx 171 \n",
        "color: white; background: black; font-weight: bold",
        "",
        checkShouldBuildOreRobotNext(i, bpNr),
        i
      );

      // Geode Robot
      if (
        ores >= blueprints[bpNr].geodeRobot.ore &&
        obsidians >= blueprints[bpNr].geodeRobot.obsidian &&
        !checkShouldBuildObsidianRobotNext(i, bpNr)
      ) {
        isBuildingGeodeRobot = true;
        ores -= blueprints[bpNr].geodeRobot.ore;
      }

      // Obsidian Robot
      if (
        ores >= blueprints[bpNr].obsidianRobot.ore &&
        clays >= blueprints[bpNr].obsidianRobot.clay &&
        !checkShouldBuildClayRobotNext(i, bpNr)
      ) {
        isBuildingObsidianRobot = true;
        ores -= blueprints[bpNr].clayRobot.ore;
      }

      // Clay Robot
      if (
        ores >= blueprints[bpNr].clayRobot.ore &&
        !checkShouldBuildOreRobotNext(i, bpNr)
      ) {
        isBuildingClayRobot = true;
        ores -= blueprints[bpNr].clayRobot.ore;
      }

      // Ore Robot
      if (ores >= blueprints[bpNr].oreRobot.ore) {
        isBuildingOreRobot = true;
        ores -= blueprints[bpNr].oreRobot.ore;
      }

      for (let i = 0; i < oreRobots; i++) {
        ores++;
      }
      for (let i = 0; i < clayRobots; i++) {
        clays++;
      }
      for (let i = 0; i < obsidianRobots; i++) {
        obsidians++;
      }
      for (let i = 0; i < geodeRobots; i++) {
        geodes++;
      }

      if (isBuildingOreRobot) {
        oreRobots++;
        isBuildingOreRobot = false;
      }
      if (isBuildingClayRobot) {
        clayRobots++;
        isBuildingClayRobot = false;
      }
      if (isBuildingObsidianRobot) {
        obsidianRobots++;
        isBuildingObsidianRobot = false;
      }
      if (isBuildingGeodeRobot) {
        geodeRobots++;
        isBuildingGeodeRobot = false;
      }
    }
  }

  // *********************************************************************************

  return (
    <div>
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => moveNr > 0 && setMoveNr(0)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Beginning
        </button>
        <button
          onClick={() => moveNr > 9 && setMoveNr(moveNr - 10)}
          style={{
            marginRight: "8px",
            color: moveNr > 9 ? "black" : "lightGray",
          }}
        >
          Prev 10
        </button>
        <button
          onClick={() => moveNr > 0 && setMoveNr(moveNr - 1)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Prev
        </button>
        <button
          onClick={() => startPlaying()}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Play
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(moveNr + 1)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Next
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves - 9 && setMoveNr(moveNr + 10)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves - 9 ? "black" : "lightGray",
          }}
        >
          Next 10
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(totalNrOfMoves)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          End
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>Minute: {moveNr}</div>
      <div style={{ marginTop: "24px" }}>Result: {result}</div>
      <div style={{ marginTop: "24px" }}>OreRobots: {oreRobots}</div>
      <div style={{ marginTop: "24px" }}>ClayRobots: {clayRobots}</div>
      <div style={{ marginTop: "24px" }}>ObsidianRobots: {obsidianRobots}</div>
      <div style={{ marginTop: "24px" }}>GeodeRobots: {geodeRobots}</div>
      <div style={{ marginTop: "24px" }}>Ores: {ores}</div>
      <div style={{ marginTop: "24px" }}>Clays: {clays}</div>
      <div style={{ marginTop: "24px" }}>Obsidians: {obsidians}</div>
      <div style={{ marginTop: "24px" }}>Geodes: {geodes}</div>
      <div style={{ marginTop: "24px" }}>
        minToBuildOreRobot: {minToBuildOreRobot}
      </div>
      <div style={{ marginTop: "24px" }}>
        minToBuildClayRobot: {minToBuildClayRobot}
      </div>
      <div style={{ marginTop: "24px" }}>
        maxClayIfBuildingOreRobot: {maxClayIfBuildingOreRobot}
      </div>
      <div style={{ marginTop: "24px" }}>maxClay: {maxClay}</div>
      <div style={{ marginTop: "24px" }}>minLeft: {minLeft}</div>
    </div>
  );
};