import React, { useState } from "react";
import eData from "./exampleDataTest";
import rData from "./realData";
import Render from "../../Render";
import { evaluate } from "mathjs";

export default () => {
  const data = [
    {
      false: 3,
      inspectedTimes: 0,
      items: [79n, 98n],
      monkeyNr: 0,
      operation: (old) => old * 19n,
      test: 23n,
      true: 2,
    },
    {
      false: 0,
      inspectedTimes: 0,
      items: [54n, 65n, 75n, 74n],
      monkeyNr: 1,
      operation: (old) => old + 6n,
      test: 19n,
      true: 2,
    },
    {
      false: 3,
      inspectedTimes: 0,
      items: [79n, 60n, 97n],
      monkeyNr: 2,
      operation: (old) => old * old,
      test: 13n,
      true: 1,
    },
    {
      false: 1,
      inspectedTimes: 0,
      items: [74n],
      monkeyNr: 3,
      operation: (old) => old + 3n,
      test: 17n,
      true: 0,
    },
  ];

  let dataMath = [
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
      //   type,
      //   j
      // );

      if (type === "normal") {
        // console.log(
        //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          data    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 104 \n",
        //   "color: white; background: black; font-weight: bold",
        //   "",
        //   data
        // );
      } else {
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

        // console.log(
        //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            evaluatedData    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 128 \n",
        //   "color: white; background: black; font-weight: bold",
        //   "",
        //   evaluatedData
        // );
      }

      // let evaluatedWorryLevel;
      // if (typeof worryLevel === "string") {
      //   console.log(evaluate(worryLevel));
      //   evaluatedWorryLevel = evaluate(worryLevel);
      // } else {
      //   console.log(worryLevel);
      //   evaluatedWorryLevel = worryLevel;
      // }

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

      // let evaluatedData = data.map((item) => {
      //   return {
      //     false: item.false,
      //     true: item.true,
      //     inspectedTimes: item.inspectedTimes,
      //     items: item.items.map((item) => {
      //       if (typeof item === "string") {
      //         return evaluate(item);
      //       } else {
      //         return item;
      //       }
      //     }),
      //     monkeyNr: item.monkeyNr,
      //     operation: item.operation,
      //   };
      // });

      // let dataJson = JSON.stringify(data, null, 2);
      // let dataJsonEval = JSON.stringify(evaluatedData, null, 2);

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

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        logger(index, worryLevel, i, j, data, type, data[i].test);
        if (worryLevel % data[i].test === 0n) {
          data[data[i].true].items.push(worryLevel);
        } else {
          // if (j === nrOfRounds - 1 && i === 2 && index === 0) {
          //   console.log(
          //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo normal    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 303 \n",
          //     "color: white; background: black; font-weight: bold",
          //     "",
          //     worryLevel
          //   );
          // }
          data[data[i].false].items.push(worryLevel);
        }

        // if (j === nrOfRounds - 1 && i === data.length - 1 && index === 0) {
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[0].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     data[0].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[1].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     data[1].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[2].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     data[2].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[3].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     data[3].items.length
        //   );
        // }
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

  for (let i = 0; i < dataMath.length; i++) {
    dataMath[i].inspectedTimes = 0;
  }
  dataMath[0].items = [79, 98];
  dataMath[1].items = [54, 65, 75, 74];
  dataMath[2].items = [79, 60, 97];
  dataMath[3].items = [74];

  for (let j = 0; j < nrOfRounds; j++) {
    for (let i = 0; i < dataMath.length; i++) {
      dataMath[i].items.forEach((item, index) => {
        // if (j === nrOfRounds - 1) debugger;
        let worryLevel = item;

        worryLevel = dataMath[i].operation(worryLevel);

        dataMath[i].inspectedTimes = dataMath[i].inspectedTimes + 1;

        logger(index, worryLevel, i, j, dataMath, type, dataMath[i].test);
        let stringy = worryLevel + ` % ${dataMath[i].test}`;
        if (evaluate(worryLevel + ` % ${dataMath[i].test}`) === 0) {
          if (j === nrOfRounds - 1 && i === 2 && index === 0) {
            // let num1 = evaluate(
            //   "((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19)"
            // );

            // let num2 = evaluate(
            //   "((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19)"
            // );
            // console.log(
            //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              stringy   \x1b[8m\x1b[40m\x1b[0m%c d.jsx 303 \n",
            //   "color: white; background: black; font-weight: bold",
            //   "",
            //   evaluate(` (${num1} ) % 13 `),
            //   num1

            //   // evaluate("18 % 13")
            // );
            // console.log(
            //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                evaluate('(((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19)')    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 323 \n",
            //   "color: white; background: black; font-weight: bold",
            //   "",
            //   evaluate(
            //     "((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19)"
            //   )
            // );
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo normal  \x1b[8m\x1b[40m\x1b[0m%c d.jsx 303 \n",
              "color: white; background: black; font-weight: bold",
              "",
              // 13988703546165100900n % 13n
              // 3740147530n % 13n
              evaluate(
                "((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) * ((((((((((((((((79 * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) + 3) + 6) * 19) %1"
              )
            );
          }
          // logger(index, worryLevel, i, j, dataMath, type);
          // if (worryLevel % dataMath[i].test === 0) {
          dataMath[dataMath[i].true].items.push(worryLevel);
        } else {
          dataMath[dataMath[i].false].items.push(worryLevel);
        }

        // if (j === nrOfRounds - 1 && i === data.length - 1 && index === 0) {
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[0].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     dataMath[0].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[1].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     dataMath[1].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[2].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     dataMath[2].items.length
        //   );
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            data[3].items.length    \x1b[8m\x1b[40m\x1b[0m%c d.jsx 241 \n",
        //     "color: white; background: black; font-weight: bold",
        //     "",
        //     dataMath[3].items.length
        //   );
        // }
      });
      dataMath[i].items = [];
    }
  }

  console.log(
    // sumInspectedTimes,
    dataMath[0].inspectedTimes,
    dataMath[1].inspectedTimes,
    dataMath[2].inspectedTimes,
    dataMath[3].inspectedTimes
  );

  return <div></div>;
};
