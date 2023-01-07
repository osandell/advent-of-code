import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import rData2 from "./realData2";
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

  let choices = [];

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let highscore = { score: 0, iteration: 0 };
  let highscores = [];

  const calculateBestChoice = ({
    ores,
    clays,
    obsidians,
    geodes,
    oreRobots,
    clayRobots,
    obsidianRobots,
    geodeRobots,
    turnsLeft,
    bpNr,
  }) => {
    turnsLeft--;

    let geodeRobResult = { result: 0 };
    let obsidianRobResult = { result: 0 };
    let clayRobResult = { result: 0 };
    let oreRobResult = { result: 0 };
    let abstainResult = { result: 0 };

    /////////////////
    // Geode Robot
    /////////////////
    if (
      ores >= blueprints[bpNr].geodeRobot.ore &&
      obsidians >= blueprints[bpNr].geodeRobot.obsidian
    ) {
      // make another check
      if (turnsLeft > 0) {
        geodeRobResult = calculateBestChoice({
          ores: ores - blueprints[bpNr].geodeRobot.ore + oreRobots,
          clays: clays + clayRobots,
          obsidians:
            obsidians - blueprints[bpNr].geodeRobot.obsidian + obsidianRobots,
          geodes: geodes + geodeRobots,
          oreRobots,
          clayRobots,
          obsidianRobots,
          geodeRobots: geodeRobots + 1,
          turnsLeft,
          bpNr,
        });
      } else {
        geodeRobResult = geodes + geodeRobots;
      }
    }

    /////////////////
    // Obsidian Robot
    /////////////////
    if (
      ores >= blueprints[bpNr].obsidianRobot.ore &&
      clays >= blueprints[bpNr].obsidianRobot.clay
    ) {
      // make another check
      if (turnsLeft > 0) {
        obsidianRobResult = calculateBestChoice({
          ores: ores - blueprints[bpNr].obsidianRobot.ore + oreRobots,
          clays: clays - blueprints[bpNr].obsidianRobot.clay + clayRobots,
          obsidians: obsidians + obsidianRobots,
          geodes: geodes + geodeRobots,
          oreRobots,
          clayRobots,
          obsidianRobots: obsidianRobots + 1,
          geodeRobots,
          turnsLeft,
          bpNr,
        });
      } else {
        obsidianRobResult = { result: geodes + geodeRobots };
      }
    }

    /////////////////
    // Clay Robot
    /////////////////
    if (ores >= blueprints[bpNr].clayRobot.ore) {
      // make another check
      if (turnsLeft > 0) {
        clayRobResult = calculateBestChoice({
          ores: ores - blueprints[bpNr].clayRobot.ore + oreRobots,
          clays: clays + clayRobots,
          obsidians: obsidians + obsidianRobots,
          geodes: geodes + geodeRobots,
          oreRobots,
          clayRobots: clayRobots + 1,
          obsidianRobots,
          geodeRobots,
          turnsLeft,
          bpNr,
        });
      } else {
        clayRobResult = { result: geodes + geodeRobots };
      }
    }

    /////////////////
    // Ore Robot
    /////////////////
    if (ores >= blueprints[bpNr].oreRobot.ore) {
      // make another check
      if (turnsLeft > 0) {
        oreRobResult = calculateBestChoice({
          ores: ores - blueprints[bpNr].oreRobot.ore + oreRobots,
          clays: clays + clayRobots,
          obsidians: obsidians + obsidianRobots,
          geodes: geodes + geodeRobots,
          oreRobots: oreRobots + 1,
          clayRobots,
          obsidianRobots,
          geodeRobots,
          turnsLeft,
          bpNr,
        });
      } else {
        oreRobResult = { result: geodes + geodeRobots };
      }
    }

    /////////////////
    // Abstain
    /////////////////
    if (turnsLeft > 0) {
      abstainResult = calculateBestChoice({
        ores: ores + oreRobots,
        clays: clays + clayRobots,
        obsidians: obsidians + obsidianRobots,
        geodes: geodes + geodeRobots,
        oreRobots,
        clayRobots,
        obsidianRobots,
        geodeRobots,
        turnsLeft,
        bpNr,
      });
    } else {
      abstainResult = { result: geodes + geodeRobots };
    }

    if (
      abstainResult.result > geodeRobResult.result &&
      abstainResult.result > obsidianRobResult.result &&
      abstainResult.result > clayRobResult.result &&
      abstainResult.result > oreRobResult.result
    ) {
      if (turnsLeft > 0) {
        return {
          result: abstainResult.result,
          choices: ["abstain"].concat(abstainResult.choices),
        };
      } else {
        return { result: abstainResult.result, choices: ["abstain"] };
      }
    } else if (
      geodeRobResult.result > obsidianRobResult.result &&
      geodeRobResult.result > clayRobResult.result &&
      geodeRobResult.result > oreRobResult.result
    ) {
      if (turnsLeft > 0) {
        return {
          result: geodeRobResult.result,
          choices: ["geodeRob"].concat(geodeRobResult.choices),
        };
      } else {
        return { result: geodeRobResult.result, choices: ["geodeRob"] };
      }
    } else if (
      obsidianRobResult.result > clayRobResult.result &&
      obsidianRobResult.result > oreRobResult.result
    ) {
      if (turnsLeft > 0) {
        return {
          result: obsidianRobResult.result,
          choices: ["obsidianRob"].concat(obsidianRobResult.choices),
        };
      } else {
        return { result: obsidianRobResult.result, choices: ["obsidianRob"] };
      }
    } else if (clayRobResult.result > oreRobResult.result) {
      if (turnsLeft > 0) {
        return {
          result: clayRobResult.result,
          choices: ["clayRob"].concat(clayRobResult.choices),
        };
      } else {
        return { result: clayRobResult.result, choices: ["clayRob"] };
      }
    } else {
      if (turnsLeft > 0) {
        return {
          result: oreRobResult.result,
          choices: ["oreRob"].concat(oreRobResult.choices),
        };
      } else {
        return { result: oreRobResult.result, choices: ["oreRob"] };
      }
    }
  };

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      start of measure    \x1b[8m\x1b[40m\x1b[0m%c b2.jsx 90 \n",
    "color: white; background: black; font-weight: bold",
    ""
  );
  var startTime = performance.now();
  // for (let bpNr = 0; bpNr < blueprints.length; bpNr++) {
  for (let bpNr = 0; bpNr < 1; bpNr++) {
    // debugger;

    let result = calculateBestChoice({
      ores: 3,
      clays: 14,
      obsidians: 7,
      geodes: 0,
      oreRobots: 2,
      clayRobots: 7,
      obsidianRobots: 4,
      geodeRobots: 1,
      turnsLeft: 12,
      bpNr,
    });

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        result    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      result
    );

    // highscore = { score: 0, iteration: 0 };
    //   oreRobots = 1;
    //   clayRobots = 0;
    //   geodeRobots = 0;
    //   obsidianRobots = 0;
    //   ores = 0;
    //   clays = 0;
    //   obsidians = 0;
    //   geodes = 0;
    //   shouldBuildObsidianRobotNext = false;
    //   shouldBuildGeodeRobotNext = false;
    //   shouldBuildClayRobotNext = false;
    //   obsidianRobLineOresPerMinuteCost = 0;
    //   geodeRobLineOresPerMinuteCost = 0;
    //     for (let i = 0; i < oreRobots; i++) {
    //       ores++;
    //     }
    //     for (let i = 0; i < clayRobots; i++) {
    //       clays++;
    //     }
    //     for (let i = 0; i < obsidianRobots; i++) {
    //       obsidians++;
    //     }
    //     for (let i = 0; i < geodeRobots; i++) {
    //       geodes++;
    //     }
    //     if (isBuildingOreRobot) {
    //       oreRobots++;
    //       isBuildingOreRobot = false;
    //     }
    //     if (isBuildingClayRobot) {
    //       clayRobots++;
    //       isBuildingClayRobot = false;
    //     }
    //     if (isBuildingObsidianRobot) {
    //       obsidianRobots++;
    //       isBuildingObsidianRobot = false;
    //     }
    //     if (isBuildingGeodeRobot) {
    //       geodeRobots++;
    //       isBuildingGeodeRobot = false;
    //     }
    //     obsidianRobLineOresPerMinuteCost =
    //       clayRobots / blueprints[bpNr].obsidianRobot.clay;
    //     geodeRobLineOresPerMinuteCost =
    //       obsidianRobots / blueprints[bpNr].geodeRobot.obsidian;
    //   }
    //   if (geodes > highscore.score) {
    //     highscore.score = geodes;
    //     highscore.iteration = i;
    //   }
    // highscores[bpNr] = highscore.score;
  }

  var endTime = performance.now();

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
    "color: white; background: black; font-weight: bold",
    "",
    endTime - startTime
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
