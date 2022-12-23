import React, { useState } from "react";
import eData from "./exampleDataTest";
import rData from "./realData";
import Render from "../../Render";
import { bignumber, add, multiply, equal, evaluate, mod } from "mathjs";

export default () => {
  const data = [
    {
      false: 3,
      inspectedTimes: 0,
      items: [bignumber(79), bignumber(98)],
      monkeyNr: 0,
      operation: (old) => multiply(old, bignumber(19)),
      test: bignumber(23),
      true: 2,
    },
    {
      false: 0,
      inspectedTimes: 0,
      items: [bignumber(54), bignumber(65), bignumber(75), bignumber(74)],
      monkeyNr: 1,
      operation: (old) => add(old, bignumber(6)),
      test: bignumber(19),
      true: 2,
    },
    {
      false: 3,
      inspectedTimes: 0,
      items: [bignumber(79), bignumber(60), bignumber(97)],
      monkeyNr: 2,
      operation: (old) => multiply(old, old),
      test: bignumber(13),
      true: 1,
    },
    {
      false: 1,
      inspectedTimes: 0,
      items: [bignumber(74)],
      monkeyNr: 3,
      operation: (old) => add(old, bignumber(3)),
      test: bignumber(17),
      true: 0,
    },
  ];

  let myNum = 13988703546165100900n;

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      bignumber.toString()    \x1b[8m\x1b[40m\x1b[0m%c e.jsx 50 \n",
    "color: white; background: black; font-weight: bold",
    "",
    myNum.toString()
  );

  var startTime = performance.now();

  // for (let j = 0; j < 10000; j++) {
  //   for (let i = 0; i < data.length; i++) {
  //     data[i].items.forEach((item) => {
  //       let worryLevel = item;

  //       worryLevel = bignumber(data[i].operation(worryLevel));

  //       data[i].inspectedTimes = data[i].inspectedTimes + 1;

  //       // if (equal(mod(worryLevel, data[i].test), 0)) {
  //       //   data[data[i].true].items.push(worryLevel);
  //       // } else {
  //       data[data[i].false].items.push(worryLevel);
  //       // }
  //     });
  //     data[i].items = [];
  //   }
  // }

  // var endTime = performance.now();

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      done:    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 437 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   endTime - startTime
  // );

  // console.log(
  //   // sumInspectedTimes,
  //   data[0].inspectedTimes,
  //   data[1].inspectedTimes,
  //   data[2].inspectedTimes,
  //   data[3].inspectedTimes
  // );

  return <div></div>;
};
