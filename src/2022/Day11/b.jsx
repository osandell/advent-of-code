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

  for (let j = 0; j < 10000; j++) {
    for (let i = 0; i < data.length; i++) {
      data[i].items.forEach((item) => {
        let worryLevel = item;

        worryLevel = data[i].operation(worryLevel);

        data[i].inspectedTimes = data[i].inspectedTimes + 1;

        if (worryLevel % data[i].test === 0n) {
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

  // Javascript implementation of the above approach

  // Function to find the largest number
  // smaller than or equal to N
  // that is divisible by k
  function findNum(N, K) {
    var rem = N % K;

    if (rem == 0) return N;
    else return N - rem;
  }

  // Driver code
  var N = 170495,
    K = 666;
  document.write(
    "Largest number smaller than or equal to " +
      N +
      "<br>that is divisible by " +
      K +
      " is " +
      findNum(N, K)
  );

  return <div></div>;
};
