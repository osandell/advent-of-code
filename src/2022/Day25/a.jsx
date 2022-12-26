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

const shiftUp = (totalSnafu, index) => {
  let foundNon2 = false;
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
};

const shiftDown = (totalSnafu, index) => {
  let foundNonDoubleMinus = false;
  for (let i = index - 1; i >= 0; i--) {
    let char = totalSnafu[i];
    if (char === "=") {
      totalSnafu[i] = "2";
    } else {
      if (!foundNonDoubleMinus) {
        switch (totalSnafu[i]) {
          case "-":
            totalSnafu[i] = "=";
            break;
          case "0":
            totalSnafu[i] = "-";
            break;
          case "1":
            totalSnafu[i] = "0";
            break;
          case "2":
            totalSnafu[i] = "1";
            break;
        }
        foundNonDoubleMinus = true;
        break;
      }
    }
  }
};

const getSnafuFromSnfuArr = (snafuArr) => {
  let test = [...snafuArr];
  let totalSnafu = snafuArr.splice(0, 1)[0].split("");
  snafuArr.forEach((snafu) => {
    let test2 = [...test];
    let index = totalSnafu.length - snafu.length;
    let foundNon2 = false;
    switch (totalSnafu[index]) {
      case "=":
        if (snafu.length === 1) {
          switch (snafu) {
            case "=":
              totalSnafu[index] = "1";
              shiftDown(totalSnafu, index);
              break;
            case "-":
              totalSnafu[index] = "2";
              shiftDown(totalSnafu, index);
              break;
            case "1":
              totalSnafu[index] = "-";
              break;
            case "2":
              totalSnafu[index] = "0";
              break;
          }
        } else {
          totalSnafu[index] = "0";
        }

        break;
      case "-":
        if (snafu.length === 1) {
          switch (snafu) {
            case "=":
              totalSnafu[index] = "2";
              shiftDown(totalSnafu, index);
              break;
            case "-":
              totalSnafu[index] = "=";
              break;
            case "1":
              totalSnafu[index] = "0";
              break;
            case "2":
              totalSnafu[index] = "1";
              break;
          }
        } else {
          totalSnafu[index] = "1";
        }
        break;
      case "0":
        if (snafu.length === 1) {
          switch (snafu) {
            case "=":
              totalSnafu[index] = "=";
              break;
            case "-":
              totalSnafu[index] = "-";
              break;
            case "1":
              totalSnafu[index] = "1";
              break;
            case "2":
              totalSnafu[index] = "2";
              break;
          }
        } else {
          totalSnafu[index] = "2";
        }
        break;
      case "1":
        if (snafu.length === 1) {
          switch (snafu) {
            case "=":
              totalSnafu[index] = "-";
              break;
            case "-":
              totalSnafu[index] = "0";
              break;
            case "1":
              totalSnafu[index] = "2";
              break;
            case "2":
              totalSnafu[index] = "=";
              shiftUp(totalSnafu, index);
              break;
          }
        } else {
          totalSnafu[index] = "=";
          shiftUp(totalSnafu, index);
        }

        break;
      case "2":
        if (snafu.length === 1) {
          switch (snafu) {
            case "=":
              totalSnafu[index] = "0";
              break;
            case "-":
              totalSnafu[index] = "1";
              break;
            case "1":
              totalSnafu[index] = "=";
              shiftUp(totalSnafu, index);
              break;
            case "2":
              totalSnafu[index] = "-";
              shiftUp(totalSnafu, index);
              break;
          }
        } else {
          totalSnafu[index] = "-";
          shiftUp(totalSnafu, index);
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
  test = getDecimalFromSnafu(["2", "=", "=", "0"]);
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    test    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    test
  );

  let snafuArr = getSnafuArrFromDecimal(totalDecimal);
  let snafu = getSnafuFromSnfuArr(snafuArr);
  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    snafu    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    snafu.join("")
  );

  return null;
};
