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

  const runSimulation = ({
    minLeft = 24,
    oreRobots = 1,
    clayRobots = 0,
    obsidianRobots = 0,
    geodeRobots = 0,
    ores = 0,
    clays = 0,
    obsidians = 0,
    geodes = 0,
    isTest = false,
    runDuration = 24,
  }) => {
    let isBuildingOreRobot = false;
    let isBuildingClayRobot = false;
    let isBuildingObsidianRobot = false;
    let isBuildingGeodeRobot = false;

    let minToBuildOreRobot;
    let minToBuildClayRobot;
    let minToBuildObsidianRobot;
    let maxClay;
    let maxClayIfBuildingOreRobot;
    let maxClayIfBuildingClayRobot;

    const checkShouldBuildObsidianRobot = (bpNr) => {
      let minLeftToGetEnoughClay =
        minToBuildClayRobot * blueprints[bpNr].obsidianRobot.clay;

      if (
        ores +
          minToBuildOreRobot * minLeftToGetEnoughClay -
          blueprints[bpNr].clayRobot.ore <
        blueprints[bpNr].oreRobot.ore
      ) {
        return false;
      }

      return true;
    };

    const checkShouldBuildGeodeRobot = (bpNr) => {
      let minLeftToGetEnoughObsidian =
        minToBuildObsidianRobot * blueprints[bpNr].geodeRobot.obsidian;

      if (
        ores +
          minToBuildOreRobot * minLeftToGetEnoughObsidian -
          blueprints[bpNr].obsidianRobot.ore <
        blueprints[bpNr].oreRobot.ore
      ) {
        return false;
      }

      return true;
    };

    const checkShouldBuildOreRobot = (bpNr) => {
      if (ores < blueprints[bpNr].oreRobot.ore) {
        return false;
      }

      if (checkShouldBuildObsidianRobot(bpNr)) {
        return false;
      }

      if (checkShouldBuildGeodeRobot(bpNr)) {
        return false;
      }

      // If we get more clay by building another clay robot we should do that intstead

      // let

      return true;
    };

    const checkShouldBuildClayRobot = (bpNr) => {
      if (ores < blueprints[bpNr].clayRobot.ore) {
        return false;
      }

      if (checkShouldBuildObsidianRobot(bpNr)) {
        return false;
      }

      if (checkShouldBuildGeodeRobot(bpNr)) {
        return false;
      }

      return true;
    };

    let specificBlueprint = 1;
    // for(let bpNr = 0; bpNr < blueprints.length; bpNr++) {
    for (let bpNr = specificBlueprint; bpNr < specificBlueprint + 1; bpNr++) {
      minToBuildOreRobot = blueprints[bpNr].oreRobot.ore / oreRobots;
      minToBuildClayRobot = blueprints[bpNr].clayRobot.ore / oreRobots;
      minToBuildObsidianRobot = blueprints[bpNr].obsidianRobot.ore / oreRobots;

      // Build ore or clay robot?
      if (ores >= blueprints[bpNr].oreRobot.ore && !isTest) {
        const buildAnOreRobotResult = runSimulation({
          minLeft: minLeft - 1,
          oreRobots: oreRobots + 1,
          ores,
          isTest: true,
        });

        let buildTimeDiff;
        if (ores < blueprints[bpNr].clayRobot.ore && !isTest) {
          buildTimeDiff =
            blueprints[bpNr].clayRobot.ore - blueprints[bpNr].oreRobot.ore;
        }

        const buildAClayRobotResult = runSimulation({
          minLeft: minLeft - 1 - buildTimeDiff,
          oreRobots: oreRobots,
          ores,

          clayRobots: clayRobots + 1,
          isTest: true,
        });

        debugger;

        if (buildAnOreRobotResult.clays > buildAClayRobotResult.clays) {
          isBuildingOreRobot = true;
          ores -= blueprints[bpNr].oreRobot.ore;
        } else {
          isBuildingClayRobot = true;
          ores -= blueprints[bpNr].clayRobot.ore;
        }

        isTest = false;
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

    minLeft = minLeft - 1;
    runDuration = runDuration - 1;

    if (minLeft === 0 || runDuration === 0) {
      return {
        oreRobots,
        clayRobots,
        obsidianRobots,
        geodeRobots,
        ores,
        clays,
        isTest,
        obsidians,
        geodes,
        minToBuildOreRobot,
        minToBuildClayRobot,
      };
    } else {
      return runSimulation({
        oreRobots,
        clayRobots,
        obsidianRobots,
        geodeRobots,
        ores,
        clays,
        isTest,
        obsidians,
        geodes,
        minLeft,
        minToBuildOreRobot,
        minToBuildClayRobot,
        runDuration,
      });
    }
  };

  let minLeft = 24;
  let oreRobots = 1;
  let clayRobots = 0;
  let obsidianRobots = 0;
  let geodeRobots = 0;
  let ores = 0;
  let clays = 0;
  let obsidians = 0;
  let geodes = 0;
  let isTest = false;
  let runDuration = 24;
  let minToBuildOreRobot;
  let minToBuildClayRobot;

  if (moveNr !== undefined) {
    let result = runSimulation({ runDuration: moveNr });
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    result    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      result
    );
    ores = result.ores;
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
      <div style={{ marginTop: "24px" }}>minLeft: {minLeft}</div>
    </div>
  );
};
