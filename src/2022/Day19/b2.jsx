import eData from "./exampleData";
import rData from "./realData2";

const blueprints = rData.split(/\n/).map((row) => {
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

export default () => {
  const calculateResult = ({
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

    if (!turnsLeft) return geodes + geodeRobots;

    let highestResult = 0;
    let geodeRobResult = 0;
    let obsidianRobResult = 0;

    /////////////////
    // Geode Robot
    /////////////////
    if (
      ores >= blueprints[bpNr].geodeRobot.ore &&
      obsidians >= blueprints[bpNr].geodeRobot.obsidian &&
      turnsLeft < 13
    ) {
      geodeRobResult = calculateResult({
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
      if (geodeRobResult > highestResult) highestResult = geodeRobResult;
    }

    /////////////////
    // Obsidian Robot
    /////////////////
    if (
      ores >= blueprints[bpNr].obsidianRobot.ore &&
      clays >= blueprints[bpNr].obsidianRobot.clay &&
      turnsLeft < 19 &&
      turnsLeft > 5
    ) {
      obsidianRobResult = calculateResult({
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
      if (obsidianRobResult > highestResult) highestResult = obsidianRobResult;
    }

    /////////////////
    // Clay Robot
    /////////////////
    if (ores >= blueprints[bpNr].clayRobot.ore && turnsLeft > 13) {
      const result = calculateResult({
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
      if (result > highestResult) highestResult = result;
    }

    /////////////////
    // Ore Robot
    /////////////////
    if (ores >= blueprints[bpNr].oreRobot.ore && turnsLeft > 23) {
      const result = calculateResult({
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
      if (result > highestResult) highestResult = result;
    }

    /////////////////
    // Abstain manufaturing robot
    /////////////////
    if (!obsidianRobResult && !geodeRobResult) {
      const result = calculateResult({
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
      if (result > highestResult) highestResult = result;
    }

    return highestResult;
  };

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      start of measure    \x1b[8m\x1b[40m\x1b[0m%c b2.jsx 90 \n",
    "color: white; background: black; font-weight: bold",
    ""
  );

  const results = [];
  var startTime = performance.now();
  for (let bpNr = 0; bpNr < blueprints.length; bpNr++) {
    results.push(
      calculateResult({
        ores: 0,
        clays: 0,
        obsidians: 0,
        geodes: 0,
        oreRobots: 1,
        clayRobots: 0,
        obsidianRobots: 0,
        geodeRobots: 0,
        turnsLeft: 32,
        bpNr,
      })
    );
  }

  // Right answer: 21840 (12, 35, 52)
  let total = results.reduce((acc, cur) => acc * cur);
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    total    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    total
  );

  var endTime = performance.now();
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
    "color: white; background: black; font-weight: bold",
    "",
    endTime - startTime
  );

  return null;
};
