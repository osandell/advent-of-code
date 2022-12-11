import React, { useState } from "react";
import eData from "./exampleData";
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
          (old) => old.mult.push(19),
          (old) => old.add.push(6),
          (old) => old.mult.push(old),
          (old) => old.add.push(3),
        ];

        return {
          monkeyNr: parseInt(line[0].split(" ")[1]),
          items: line[1]
            .split(": ")[1]
            .split(", ")
            .map((nr) => {
              return { mult: [parseInt(nr)], add: 0 };
            }),
          operation: funcs[index],
          test: parseInt(line[3].split("by ")[1]),
          true: parseInt(line[4].split("monkey ")[1]),
          false: parseInt(line[5].split("monkey ")[1]),
          inspectedTimes: 0,
        };
      });

    const test = -1;
    let trail;
    let yo = 0;

    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < data.length; i++) {
        data[i].items.forEach((item) => {
          // let thisIsIt = false;
          // if (item === trail) {
          //   thisIsIt = true;
          // }

          // if (!trail && yo === 2) {
          //   trail = item;
          //   // console.log(
          //   //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    trail    \x1b[8m\x1b[40m\x1b[0m\n",
          //   //   "color: white; background: black; font-weight: bold",
          //   //   trail
          //   // );
          //   thisIsIt = true;
          // }
          // yo++;

          let worryLevel = item;

          j === test &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              worryLevel 1   \x1b[8m\x1b[40m\x1b[0m%c b.jsx 45 \n",
              "color: white; background: black; font-weight: bold",
              "",
              worryLevel
            );

          j === test &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              data[i].operation(worryLevel)    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 46 \n",
              "color: white; background: black; font-weight: bold",
              "",
              data[i].operation
            );

          worryLevel = data[i].operation(worryLevel);

          // if (thisIsIt) {
          //   trail = worryLevel;
          //   // console.log(
          //   //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    trail    \x1b[8m\x1b[40m\x1b[0m\n",
          //   //   "color: white; background: black; font-weight: bold",
          //   //   trail,
          //   //   data[i].operation
          //   // );
          // }

          if (worryLevel > 1000000000000) {
            // worryLevel = 3130708670094187;
          }

          j === test &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              worryLevel 2   \x1b[8m\x1b[40m\x1b[0m%c b.jsx 45 \n",
              "color: white; background: black; font-weight: bold",
              "",
              worryLevel
            );

          j === test &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              data[i].test    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 66 \n",
              "color: white; background: black; font-weight: bold",
              "",
              data[i].test
            );

          data[i].inspectedTimes = data[i].inspectedTimes + 1;

          if (
            worryLevel.mult.length > 0 &&
            worryLevel.mult[0] % data[i].test === 0
          ) {
            j === test &&
              console.log(
                "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                true    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 76 \n",
                "color: white; background: black; font-weight: bold",
                "",
                data[i].false
              );

            // if (thisIsIt) {
            //   // console.log(
            //   //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                    true    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 118 \n",
            //   //   "color: white; background: black; font-weight: bold",
            //   //   "",
            //   //   true,
            //   //   data[i].test
            //   // );
            // }
            data[data[i].true].items.push(worryLevel);
          } else {
            j === test &&
              console.log(
                "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                false    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 83 \n",
                "color: white; background: black; font-weight: bold",
                "",
                data[i].false
              );
            data[data[i].false].items.push(worryLevel);
          }
        });
        data[i].items = [];
      }

      console.log(
        // sumInspectedTimes,
        data[0].inspectedTimes,
        data[1].inspectedTimes,
        data[2].inspectedTimes,
        data[3].inspectedTimes
      );

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
        console.log(
          // sumInspectedTimes,
          data[0].inspectedTimes,
          data[1].inspectedTimes,
          data[2].inspectedTimes,
          data[3].inspectedTimes
        );
      }

      if (j === 999 && row20correct) {
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
