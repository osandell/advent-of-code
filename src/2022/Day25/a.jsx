import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";
import { to } from "mathjs";

const data = rData.split(/\n/).map((row) => row.split(""));

const getDecimalFromSnafu = (snafu) => {
  let decimalNr = 0;
  for (let i = 0; i < snafu.length; i++) {
    let multiplier = Math.pow(5, snafu.length - i - 1);
    switch (snafu[i]) {
      case "2":
        decimalNr += 2 * multiplier;
        break;
      case "1":
        decimalNr += 1 * multiplier;
        break;
      case "0":
        decimalNr += 0 * multiplier;
        break;
      case "-":
        decimalNr += -1 * multiplier;
        break;
      case "=":
        decimalNr += -2 * multiplier;
        break;
    }
  }
  return decimalNr;
};

const getSnafuArrFromDecimal = (decimal) => {
  let isDone = false;
  let i = 0;
  let snafu = "2";
  let largestNumber = 0;
  let lastMultiplier = 0;
  let rest = 0;
  while (!isDone) {
    let multiplier = Math.pow(5, i);
    i++;
    if (multiplier * 2 > decimal) {
      isDone = true;
      largestNumber = lastMultiplier * 2;
      rest = decimal - lastMultiplier * 2;

      for (let j = 1; j < i - 1; j++) {
        snafu += "0";
      }
    }
    lastMultiplier = multiplier;
  }

  if (rest > 2) {
    return [snafu].concat(getSnafuArrFromDecimal(rest));
  }

  return [snafu].concat([rest.toString()]);
};

const getSnafuFromSnfuArr = (snafuArr) => {
  let totalSnafu = snafuArr.splice(0, 1)[0].split("");
  // debugger;
  snafuArr.forEach((snafu) => {
    let index = totalSnafu.length - snafu.length;
    let foundNon2 = false;
    switch (totalSnafu[index]) {
      case "=":
        totalSnafu[index] = snafu.length === 1 ? snafu : "0";
        break;
      case "-":
        totalSnafu[index] = snafu.length === 1 ? snafu : "1";
        break;
      case "0":
        totalSnafu[index] = snafu.length === 1 ? snafu : "2";
        break;
      case "1":
        totalSnafu[index] = snafu.length === 1 ? snafu : "=";
        for (let i = index - 1; i >= 0; i--) {
          let char = totalSnafu[i];
          if (char === "2") {
            totalSnafu[i] = "=";
          } else {
            if (!foundNon2) {
              switch (totalSnafu[i]) {
                case "=":
                  totalSnafu[i] = "-";
                  break;
                case "-":
                  totalSnafu[i] = "0";
                  break;
                case "0":
                  totalSnafu[i] = "1";
                  break;
                case "1":
                  totalSnafu[i] = "2";
                  break;
              }
              foundNon2 = true;
              break;
            }
          }
        }

        if (!foundNon2) {
          totalSnafu.unshift("1");
        }
        break;
      case "2":
        totalSnafu[index] = "-";
        for (let i = index - 1; i >= 0; i--) {
          let char = totalSnafu[i];
          if (char === "2") {
            totalSnafu[i] = "=";
          } else {
            if (!foundNon2) {
              switch (totalSnafu[i]) {
                case "=":
                  totalSnafu[i] = "-";
                  break;
                case "-":
                  totalSnafu[i] = "0";
                  break;
                case "0":
                  totalSnafu[i] = "1";
                  break;
                case "1":
                  totalSnafu[i] = "2";
                  break;
              }
              foundNon2 = true;
              break;
            }
          }
        }

        if (!foundNon2) {
          totalSnafu.unshift("1");
        }
        break;
    }
  });
  return totalSnafu;
};

// 4890
export default () => {
  let totalDecimal = data
    .map((snafu) => getDecimalFromSnafu(snafu))
    .reduce((a, b) => a + b, 0);

  let test = getDecimalFromSnafu(["1", "=", "1", "2", "2", "2"]);
  test = getDecimalFromSnafu(["1", "=", "1", "1", "-", "2"]);
  test = getDecimalFromSnafu(["2", "2", "2", "2", "2"]);
  test = getDecimalFromSnafu(["2", "0", "2", "0"]);

  let snafuArr = getSnafuArrFromDecimal(totalDecimal);
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    snafuArr    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    snafuArr
  );
  let snafu = getSnafuFromSnfuArr(snafuArr);
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    snafu    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    snafu.join("")
  );

  return null;
};
