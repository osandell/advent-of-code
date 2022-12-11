import React, { useState } from "react";
import eData from "./exampleDataB";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  for (let k = 1; k < 2; k += 1) {
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
            .map((item) => {
              return {
                worryLevel: parseInt(item.split(":")[0]),
                index: parseInt(item.split(":")[1]),
              };
            }),
          operation: funcs[index],
          test: parseInt(line[3].split("by ")[1]),
          true: parseInt(line[4].split("monkey ")[1]),
          false: parseInt(line[5].split("monkey ")[1]),
          inspectedTimes: 0,
          inspectedItems: [],
        };
      });
    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < data.length; i++) {
        data[i].items.forEach((item) => {
          let worryLevel = item.worryLevel;
          let itemIndex = item.index;
          let initialWorryLevel = worryLevel;

          // if (!data[i].inspectedItems.includes(itemIndex)) {
          //   console.log(
          //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo, j    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 53 \n",
          //     "color: white; background: black; font-weight: bold",
          //     "",
          //     j
          //   );
          //   data[i].inspectedItems.push(itemIndex);
          // }
          worryLevel = data[i].operation(worryLevel);

          //den här ger rätt på round 20, hyfsat rätt på 1000
          // if (worryLevel > k) {
          //   worryLevel = initialWorryLevel * 2;
          // }
          // if (worryLevel > k) {
          //   worryLevel = Math.floor(initialWorryLevel);
          // }

          data[i].inspectedTimes = data[i].inspectedTimes + 1;

          if (worryLevel % data[i].test === 0) {
            data[data[i].true].items.push({
              worryLevel: worryLevel,
              index: itemIndex,
            });
          } else {
            data[data[i].false].items.push({
              worryLevel: worryLevel,
              index: itemIndex,
            });
          }
        });
        data[i].items = [];

        const move = data[i];
      }

      const sumInspectedTimes =
        data[0].inspectedTimes +
        data[1].inspectedTimes +
        data[2].inspectedTimes +
        data[3].inspectedTimes;

      if (
        data[0].inspectedTimes === 99 &&
        data[1].inspectedTimes === 97 &&
        data[2].inspectedTimes === 8 &&
        data[3].inspectedTimes === 103
      ) {
        // alert("yoyo");
        if (j === 19) {
          row20correct = true;
        }
      }

      if (j === 999 && row20correct) {
        console.log(
          // sumInspectedTimes,
          data[0].inspectedTimes,
          data[1].inspectedTimes,
          data[2].inspectedTimes,
          data[3].inspectedTimes
        );
      } else {
        // console.log("nope");
        console.log(
          // sumInspectedTimes,
          data[0].inspectedTimes,
          data[1].inspectedTimes,
          data[2].inspectedTimes,
          data[3].inspectedTimes
        );
      }
    }
  }

  return <div></div>;
};
