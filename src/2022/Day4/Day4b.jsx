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

  let nrOfPairsOverlapping = 0;
  data.forEach(([sectionsA, sectionsB]) => {
    let isOverlapping = false;
    sectionsA.forEach((section) => {
      if (sectionsB.includes(section)) {
        isOverlapping = true;
      }
    });

    isOverlapping && nrOfPairsOverlapping++;
  });

  const result = nrOfPairsOverlapping;

  return <div>{result}</div>;
};
