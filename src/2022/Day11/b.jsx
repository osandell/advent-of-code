import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  let row20correct = false;
  const data = eData
    .split("\n\n")
    .map((monkeyChunk) => monkeyChunk.split("\n"))
    .map((line, index) => {
      const funcs = [
        (old) => old * 19,
        (old) => old + 6,
        (old) => old * old,
        (old) => old + 3,
      ];

      return {
        monkeyNr: parseInt(line[0].split(" ")[1]),
        items: line[1]
          .split(": ")[1]
          .split(", ")
          .map((nr) => parseInt(nr)),
        operation: funcs[index],
        test: parseInt(line[3].split("by ")[1]),
        true: parseInt(line[4].split("monkey ")[1]),
        false: parseInt(line[5].split("monkey ")[1]),
        inspectedTimes: 0,
      };
    });
  for (let j = 0; j < 20; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        let initialWorry = worryLevel;

        worryLevel = data[i].operation(worryLevel);
        // console.log(
        //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    worryLevel    \x1b[8m\x1b[40m\x1b[0m\n",
        //   "color: white; background: black; font-weight: bold",
        //   worryLevel
        // );

        if (worryLevel > 900719925474099) {
          console.log(
            "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    big nr    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 48 \n",
            "color: white; background: black; font-weight: bold",
            ""
          );
        }

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        // if (i === 0 || i === 2) {
        //   if (initialWorry % data[i].test === 0) {
        //     // console.log(
        //     //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 59 \n",
        //     //   "color: white; background: black; font-weight: bold",
        //     //   ""
        //     // );
        //     data[data[i].true].items.push(data[i].test);
        //   } else {
        //     console.log(
        //       "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                initialWorry % data[i].test    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 65 \n",
        //       "color: white; background: black; font-weight: bold",
        //       "",
        //       initialWorry % data[i].test
        //     );
        //     data[data[i].false].items.push(initialWorry % data[i].test);
        //   }
        // } else {
        if (worryLevel % data[i].test === 0) {
          data[data[i].true].items.push(data[i].test * 2);
        } else {
          data[data[i].false].items.push(
            data[i].test * 2 + (worryLevel % data[i].test)
          );
        }
        // }
      });
      data[i].items = [];

      const move = data[i];
    }

    // if (j === 19) {
    console.log(
      // sumInspectedTimes,
      data[0].inspectedTimes,
      data[1].inspectedTimes,
      data[2].inspectedTimes,
      data[3].inspectedTimes
    );
    // }
  }

  return <div></div>;
};
