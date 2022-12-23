import React, { useState } from "react";
import eData from "./exampleDataTest";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  const data = [
    {
      false: 3,
      inspectedTimes: 0,
      items: [79n, 98n],
      monkeyNr: 0,
      operation: (old) => old * 19n,
      operator: "*",
      operand: "19",
      test: 23n,
      true: 2,
    },
    {
      false: 0,
      inspectedTimes: 0,
      items: [54n, 65n, 75n, 74n],
      monkeyNr: 1,
      operation: (old) => old + 6n,
      operator: "+",
      operand: "6",
      test: 19n,
      true: 2,
    },
    {
      false: 3,
      inspectedTimes: 0,
      items: [79n, 60n, 97n],
      monkeyNr: 2,
      operation: (old) => old * old,
      operator: "^",
      operand: "2",
      test: 13n,
      true: 1,
    },
    {
      false: 1,
      inspectedTimes: 0,
      items: [74n],
      monkeyNr: 3,
      operation: (old) => old + 3n,
      operator: "+",
      operand: "3",
      test: 17n,
      true: 0,
    },
  ];

  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        worryLevel = data[i].operation(worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        if (worryLevel % data[i].test === 0n) {
          // data[data[i].true].items.push(worryLevel);
          data[data[i].true].items.push(
            (worryLevel % data[data[i].true].test) + data[data[i].true].test
          );
        } else {
          console.log(
            "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              data[data[i].true].test    \x1b[8m\x1b[40m\x1b[0m%c f.jsx 56 \n",
            "color: white; background: black; font-weight: bold",
            "",
            worryLevel % data[data[i].true].test
          );
          // data[data[i].false].items.push(worryLevel);
          data[data[i].false].items.push(
            (worryLevel % data[data[i].false].test) + data[data[i].false].test
          );
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
