import React, { useState } from "react";
import eData from "./exampleDataTest";
import rData from "./realData";
import Render from "../../Render";
import { evaluate } from "mathjs";

export default () => {
  let data = [
    {
      false: 3,
      inspectedTimes: 0,
      items: [79, 98],
      monkeyNr: 0,
      operation: (old) => `(${old} * 19)`,
      test: 23,
      true: 2,
    },
    {
      false: 0,
      inspectedTimes: 0,
      items: [54, 65, 75, 74],
      monkeyNr: 1,
      operation: (old) => `(${old} + 6)`,
      test: 19,
      true: 2,
    },
    {
      false: 3,
      inspectedTimes: 0,
      items: [79, 60, 97],
      monkeyNr: 2,
      operation: (old) => `(${old} * ${old})`,
      test: 13,
      true: 1,
    },
    {
      false: 1,
      inspectedTimes: 0,
      items: [74],
      monkeyNr: 3,
      operation: (old) => `(${old} + 3)`,
      test: 17,
      true: 0,
    },
  ];

  let type = "normal";

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      evaluate(`13988703546165100000 % 13`)    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 49 \n",
    "color: white; background: black; font-weight: bold",
    "",
    // evaluate(`13988703546165100000 % 13`)
    evaluate(`13 % 13`)
  );

  let res = 13 % 13;
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    res    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    res
  );

  let nrOfRounds = 11;
  const logger = (index, worryLevel, i, j, data, type, test) => {
    if (
      i === 2 &&
      // i === data.length - 1 &&
      index === data[i].items.length - 1 &&
      j === nrOfRounds - 1
    ) {
      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          type    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 80 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   type
      // );

      let evaluatedWorryLevel;
      if (typeof worryLevel === "string") {
        console.log(evaluate(worryLevel));
        evaluatedWorryLevel = evaluate(worryLevel);
      } else {
        console.log(worryLevel);
        evaluatedWorryLevel = worryLevel;
      }

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          evaluatedWorryLevel    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 73 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   evaluatedWorryLevel
      // );

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          evaluatedWorryLevel % test    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 80 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   evaluatedWorryLevel % test
      // );

      // if (type === "math") {
      //   console.log(
      //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    yo    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 88 \n",
      //     "color: white; background: black; font-weight: bold",
      //     ""
      //   );
      //   let result = evaluate(`13988703546165100000 % 13`);
      //   console.log(
      //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    result    \x1b[8m\x1b[40m\x1b[0m\n",
      //     "color: white; background: black; font-weight: bold",
      //     result,
      //     evaluatedWorryLevel % test,
      //     evaluatedWorryLevel,
      //     test
      //   );
      // }

      let evaluatedData = data.map((item) => {
        return {
          false: item.false,
          true: item.true,
          inspectedTimes: item.inspectedTimes,
          items: item.items.map((item) => {
            if (typeof item === "string") {
              return evaluate(item);
            } else {
              return item;
            }
          }),
          monkeyNr: item.monkeyNr,
          operation: item.operation,
        };
      });

      let dataJson = JSON.stringify(data, null, 2);
      let dataJsonEval = JSON.stringify(evaluatedData, null, 2);

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          dataJson    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 72 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   dataJsonEval
      // );

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    j    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 77 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   j
      // );
      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          index    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 78 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   index
      // );
      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          i    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 78 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   i
      // );
    }
  };

  for (let j = 0; j < nrOfRounds; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item, index) => {
        let worryLevel = item;

        worryLevel = data[i].operation(worryLevel);
        worryLevel = evaluate(worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        // if (evaluate(worryLevel + ` % ${data[i].test}`) === 0) {
        logger(index, worryLevel, i, j, data, type, data[i].test);
        if (worryLevel % data[i].test === 0) {
          // logger(index, worryLevel, i, j, data, type);
          data[data[i].true].items.push(worryLevel);
        } else {
          data[data[i].false].items.push(worryLevel);
        }
      });
      data[i].items = [];
    }
  }

  console.log(
    // sumInspectedTimes,
    data[0].inspectedTimes,
    data[1].inspectedTimes,
    data[2].inspectedTimes,
    data[3].inspectedTimes
  );

  type = "math";

  for (let i = 0; i < data.length; i++) {
    data[i].inspectedTimes = 0;
  }
  data[0].items = [79, 98];
  data[1].items = [54, 65, 75, 74];
  data[2].items = [79, 60, 97];
  data[3].items = [74];

  for (let j = 0; j < nrOfRounds; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item, index) => {
        // if (j === nrOfRounds - 1) debugger;
        let worryLevel = item;

        worryLevel = data[i].operation(worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        logger(index, worryLevel, i, j, data, type, data[i].test);
        if (evaluate(worryLevel + ` % ${data[i].test}`) === 0) {
          // logger(index, worryLevel, i, j, data, type);
          // if (worryLevel % data[i].test === 0) {
          data[data[i].true].items.push(worryLevel);
        } else {
          data[data[i].false].items.push(worryLevel);
        }
      });
      data[i].items = [];
    }
  }

  console.log(
    // sumInspectedTimes,
    data[0].inspectedTimes,
    data[1].inspectedTimes,
    data[2].inspectedTimes,
    data[3].inspectedTimes
  );

  return <div></div>;
};
