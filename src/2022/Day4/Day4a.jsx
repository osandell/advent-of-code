import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const data = realData.split(/\n/).map((row) =>
    row
      .split(/,/)
      .map((sectionSpan) =>
        sectionSpan.split(/-/).map((number) => parseInt(number))
      )
      .map(([firstSection, lastSection]) => {
        let sections = [];
        for (let index = firstSection; index <= lastSection; index++) {
          sections.push(index);
        }

        return sections;
      })
  );

  let nrOfPairsIncludeAll = 0;
  data.forEach(([sectionsA, sectionsB]) => {
    let aContainsAllB = true;
    sectionsA.forEach((section) => {
      if (!sectionsB.includes(section)) {
        aContainsAllB = false;
      }
    });

    let bContainsAllA = true;
    sectionsB.forEach((section) => {
      if (!sectionsA.includes(section)) {
        bContainsAllA = false;
      }
    });

    if (aContainsAllB || bContainsAllA) {
      nrOfPairsIncludeAll++;
    }
  });

  const result = nrOfPairsIncludeAll;

  return <div>{result}</div>;
};
