import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData2";
import Render from "../../Render";

let totalTime = 24;
const INITIAL_MOVE_NR = 24;
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

  let shouldBuildObsidianRobotNext = false;
  let shouldBuildGeodeRobotNext = false;
  let shouldBuildClayRobotNext = false;

  let obsidianRobLineOresPerMinuteCost = 0;
  let geodeRobLineOresPerMinuteCost = 0;

  let specificBlueprint = 0;

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let highscore = { score: 0, iteration: 0 };

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      start of measure    \x1b[8m\x1b[40m\x1b[0m%c b2.jsx 90 \n",
    "color: white; background: black; font-weight: bold",
    ""
  );
  var startTime = performance.now();
  for (let i = 0; i < 256 * 256 * 256; i++) {
    // for (let bpNr = 0; bpNr < blueprints.length; bpNr++) {
    for (let bpNr = 1; bpNr < 2; bpNr++) {
      oreRobots = 1;
      clayRobots = 0;
      geodeRobots = 0;
      obsidianRobots = 0;
      ores = 0;
      clays = 0;
      obsidians = 0;
      geodes = 0;
      shouldBuildObsidianRobotNext = false;
      shouldBuildGeodeRobotNext = false;
      shouldBuildClayRobotNext = false;
      obsidianRobLineOresPerMinuteCost = 0;
      geodeRobLineOresPerMinuteCost = 0;

      // for (let bpNr = specificBlueprint; bpNr < specificBlueprint + 1; bpNr++) {
      minLeft = totalTime - moveNr;

      for (let currMove = 0; currMove < moveNr; currMove++) {
        // if (i === 256 * 256 * 256 - 1) debugger;
        // if (i === 10) {
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            (myInt >> n) & 0x1    \x1b[8m\x1b[40m\x1b[0m%c b2.jsx 117 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     !!((i >> currMove) & 0x1)
        //   );
        // }

        if (
          !!((i >> 0) & 0x1) &&
          !!((i >> 1) & 0x1) &&
          !!((i >> 2) & 0x1) &&
          !!((i >> 3) & 0x1) &&
          !!((i >> 4) & 0x1)
        ) {
          debugger;
        }

        if (currMove >= 17) {
          // debugger;
        }
        /////////////////
        // Geode Robot
        /////////////////
        let obsidiansMissing = blueprints[bpNr].geodeRobot.obsidian - obsidians;
        let nrOfMovesUntilEnoughObsidians = Math.ceil(
          obsidiansMissing / obsidianRobots
        );
        // We wanna paus all other manufacturing at some point not to slow down
        // Geode Robot production. Determine if doing so the next move would
        // mean it's too late and if so do it this move.
        if (
          nrOfMovesUntilEnoughObsidians * oreRobots <
          blueprints[bpNr].geodeRobot.ore
        ) {
          shouldBuildGeodeRobotNext = true;
          shouldBuildObsidianRobotNext = false;
        }
        // We always wanna build a Geode Robot if we can.
        if (
          ores >= blueprints[bpNr].geodeRobot.ore &&
          obsidians >= blueprints[bpNr].geodeRobot.obsidian
        ) {
          isBuildingGeodeRobot = true;
          shouldBuildGeodeRobotNext = false;
          ores -= blueprints[bpNr].geodeRobot.ore;
          obsidians -= blueprints[bpNr].geodeRobot.obsidian;
        }

        /////////////////
        // Obsidian Robot
        /////////////////
        let claysMissing = blueprints[bpNr].obsidianRobot.clay - clays;
        let nrOfMovesUntilEnoughClay = Math.ceil(claysMissing / clayRobots);
        // We wanna paus manufacturing of ore and clay robots at some point not
        // to slow down Obsidian Robot production. Determine if doing so the
        // next move would mean it's too late and if so do it this move.
        if (
          nrOfMovesUntilEnoughClay * oreRobots <
            blueprints[bpNr].obsidianRobot.ore &&
          !shouldBuildGeodeRobotNext
        ) {
          shouldBuildObsidianRobotNext = true;
        }
        if (
          ores >= blueprints[bpNr].obsidianRobot.ore &&
          clays >= blueprints[bpNr].obsidianRobot.clay &&
          shouldBuildObsidianRobotNext === true
        ) {
          isBuildingObsidianRobot = true;
          shouldBuildObsidianRobotNext = false;
          ores -= blueprints[bpNr].obsidianRobot.ore;
          clays -= blueprints[bpNr].obsidianRobot.clay;
        }

        /////////////////
        // Ore Robot
        /////////////////
        let shouldTryToBuildOreRobot = !!((i >> currMove) & 0x1);

        if (shouldTryToBuildOreRobot) {
          if (
            !shouldBuildObsidianRobotNext &&
            !shouldBuildGeodeRobotNext &&
            ores >= blueprints[bpNr].oreRobot.ore
          ) {
            isBuildingOreRobot = true;
            ores -= blueprints[bpNr].oreRobot.ore;
          }
        } else {
          if (
            !shouldBuildObsidianRobotNext &&
            !shouldBuildGeodeRobotNext &&
            ores >= blueprints[bpNr].clayRobot.ore
          ) {
            isBuildingClayRobot = true;
            ores -= blueprints[bpNr].clayRobot.ore;
          }
        }

        // if (
        //   oreRobots <
        //     obsidianRobLineOresPerMinuteCost + geodeRobLineOresPerMinuteCost &&
        //   !shouldBuildObsidianRobotNext &&
        //   !shouldBuildGeodeRobotNext &&
        //   ores >= blueprints[bpNr].oreRobot.ore
        // ) {
        //   isBuildingOreRobot = true;
        //   ores -= blueprints[bpNr].oreRobot.ore;
        // }

        // if (
        //   i < 5 &&
        //   !shouldBuildObsidianRobotNext &&
        //   !shouldBuildGeodeRobotNext &&
        //   ores >= blueprints[bpNr].oreRobot.ore
        // ) {
        //   isBuildingOreRobot = true;
        //   ores -= blueprints[bpNr].oreRobot.ore;
        // }

        /////////////////
        // Clay Robot
        /////////////////
        // if (
        //   !shouldBuildObsidianRobotNext &&
        //   !shouldBuildGeodeRobotNext &&
        //   ores >= blueprints[bpNr].clayRobot.ore
        // ) {
        //   isBuildingClayRobot = true;
        //   ores -= blueprints[bpNr].clayRobot.ore;
        // }

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

        obsidianRobLineOresPerMinuteCost =
          clayRobots / blueprints[bpNr].obsidianRobot.clay;
        geodeRobLineOresPerMinuteCost =
          obsidianRobots / blueprints[bpNr].geodeRobot.obsidian;
      }
    }

    if (geodes > highscore.score) {
      highscore.score = geodes;
      highscore.iteration = i;
    }
  }

  var endTime = performance.now();

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
    "color: white; background: black; font-weight: bold",
    "",
    endTime - startTime
  );

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      highscore    \x1b[8m\x1b[40m\x1b[0m%c b2.jsx 295 \n",
    "color: white; background: black; font-weight: bold",
    "",
    highscore
  );

  // *********************************************************************************

  return (
    <div>
      {" "}
      !!!!??????!!!!?????????!?!?!?!++++?????+++???? !?+++????????????????????
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
      <div style={{ marginTop: "24px" }}>
        total drif cost:{" "}
        {obsidianRobLineOresPerMinuteCost + geodeRobLineOresPerMinuteCost}
      </div>
    </div>
  );
};
