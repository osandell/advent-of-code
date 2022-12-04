import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const data = realData
    .split(/\n/)
    .map((row) =>
      row
        .split(",")
        .map((sectionSpan) =>
          sectionSpan.split("-").map((number) => parseInt(number))
        )
    );

  let nrOfPairsIncludeAll = 0;
  data.forEach(([sectionsA, sectionsB]) => {
    let secAList = [];
    for (var i = sectionsA[0]; i <= sectionsA[1]; i++) {
      secAList.push(i);
    }
    let secBList = [];

    for (var i = sectionsB[0]; i <= sectionsB[1]; i++) {
      secBList.push(i);
    }

    let aContainsAllB = true;
    secAList.forEach((secA) => {
      if (!secBList.includes(secA)) {
        aContainsAllB = false;
      }
    });

    let bContainsAllA = true;
    secBList.forEach((secB) => {
      if (!secAList.includes(secB)) {
        bContainsAllA = false;
      }
    });

    if (aContainsAllB || bContainsAllA) {
      nrOfPairsIncludeAll++;
    }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      nrOfPairsIncludeAll    \x1b[8m\x1b[40m\x1b[0m%c Day4a.jsx 49 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nrOfPairsIncludeAll
  );

  const result = 0;

  return <div>{result}</div>;
};
