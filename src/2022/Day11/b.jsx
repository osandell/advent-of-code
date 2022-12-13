import React, { useState } from "react";
import eData from "./exampleDataTest";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  const devisableNrsArr = [];

  for (let trailNumber = 0; trailNumber < 100; trailNumber++) {
    const data = [
      {
        false: 3,
        inspectedTimes: 0,
        items: [98],
        monkeyNr: 0,
        operation: (old) => old * 19,
        test: 23,
        true: 2,
      },
      {
        false: 0,
        inspectedTimes: 0,
        items: [],
        monkeyNr: 1,
        operation: (old) => old + 6,
        test: 19,
        true: 2,
      },
      {
        false: 3,
        inspectedTimes: 0,
        items: [],
        monkeyNr: 2,
        operation: (old) => old * old,
        test: 13,
        true: 1,
      },
      {
        false: 1,
        inspectedTimes: 0,
        items: [],
        monkeyNr: 3,
        operation: (old) => old + 3,
        test: 17,
        true: 0,
      },
    ];

    let divisableNrs = "";
    let trailNumber2 = trailNumber;

    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < data.length; i++) {
        data[i].items.forEach((item) => {
          let worryLevel = item;

          let thisIsIt = false;

          if (worryLevel === trailNumber2) {
            // console.log(
            //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 39 \n",
            //   "color: white; background: black; font-weight: bold",
            //   ""
            // );

            thisIsIt = true;
          }
          j === 0 &&
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c     xxxxxxxxx   \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
              "color: white; background: black; font-weight: bold",
              "",
              trailNumber2,
              worryLevel
            );

          worryLevel = data[i].operation(worryLevel);

          if (thisIsIt) {
            trailNumber2 = worryLevel;
            // console.log(
            //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    trailNumber    \x1b[8m\x1b[40m\x1b[0m\n",
            //   "color: white; background: black; font-weight: bold",
            //   trailNumber
            // );
          }

          // i === 0 &&
          //   j === 1 &&
          //   console.log(
          //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      2          i 0 j 2    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 67 \n",
          //     "color: white; background: black; font-weight: bold",
          //     "",
          //     true,
          //     i,
          //     data[i].test,
          //     worryLevel
          //   );

          data[i].inspectedTimes = data[i].inspectedTimes + 1;

          if (worryLevel % data[i].test === 0) {
            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                yo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 107 \n",
              "color: white; background: black; font-weight: bold",
              ""
            );
            // console.log(
            //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                true    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 44 \n",
            //   "color: white; background: black; font-weight: bold",
            //   "",
            //   true
            // );
            if (thisIsIt) {
              divisableNrs = divisableNrs + j + ":";
              // console.log(
              //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    delbart    \x1b[8m\x1b[40m\x1b[0m\n",
              //   "color: white; background: black; font-weight: bold",
              //   j,
              //   worryLevel
              // );
            }
            data[data[i].true].items.push(worryLevel);
          } else {
            data[data[i].false].items.push(worryLevel);
          }
        });
        data[i].items = [];
      }

      // console.log(
      //   // sumInspectedTimes,
      //   data[0].inspectedTimes,
      //   data[1].inspectedTimes,
      //   data[2].inspectedTimes,
      //   data[3].inspectedTimes
      // );
    }

    if (divisableNrs === "4:12:") {
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          yoyo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 142 \n",
        "color: white; background: black; font-weight: bold",
        "",
        trailNumber
      );
    }

    if (divisableNrs !== "") {
      devisableNrsArr.push(divisableNrs);
    }
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      devisableNrsArr    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 150 \n",
    "color: white; background: black; font-weight: bold",
    "",
    devisableNrsArr
  );

  return <div></div>;
};
