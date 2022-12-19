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

  let specificBlueprint = 1;
  // for(let bpNr = 0; bpNr < blueprints.length; bpNr++) {
  for (let bpNr = specificBlueprint; bpNr < specificBlueprint + 1; bpNr++) {
    let oreClayRatio =
      blueprints[bpNr].obsidianRobot.clay / blueprints[bpNr].obsidianRobot.ore;

    for (let i = 0; i < moveNr; i++) {
      // debugger;

      // Geode Robot
      if (
        obsidians >= blueprints[bpNr].geodeRobot.obsidian &&
        ores >= blueprints[bpNr].geodeRobot.ore
      ) {
        isBuildingGeodeRobot = true;
        ores -= blueprints[bpNr].geodeRobot.ore;
        obsidians -= blueprints[bpNr].geodeRobot.obsidian;
      }

      // Obsidian Robot
      if (
        clays >= blueprints[bpNr].obsidianRobot.clay &&
        ores >= blueprints[bpNr].obsidianRobot.ore &&
        obsidians < blueprints[bpNr].geodeRobot.obsidian - geodeRobots * 2
      ) {
        isBuildingObsidianRobot = true;
        ores -= blueprints[bpNr].obsidianRobot.ore;
        clays -= blueprints[bpNr].obsidianRobot.clay;
      }

      // Clay Robot
      if (
        ores >= blueprints[bpNr].clayRobot.ore &&
        clays < blueprints[bpNr].obsidianRobot.clay - clayRobots * 2 &&
        obsidians < blueprints[bpNr].geodeRobot.obsidian - geodeRobots * 3
      ) {
        isBuildingClayRobot = true;
        ores -= blueprints[bpNr].clayRobot.ore;
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
    </div>
  );
};
