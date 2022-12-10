import React from "react";
import eData from "./exampleData";
import rData from "./realData";

export default () => {
  const data = rData.split("\n");

  let cycle = 0;
  let x = 1;
  let result = 0;

  const modifyResult = () => {
    if (
      cycle === 20 ||
      cycle === 60 ||
      cycle === 100 ||
      cycle === 140 ||
      cycle === 180 ||
      cycle === 220
    ) {
      result += cycle * x;
    }
  };

  data.forEach((line) => {
    if (line === "noop") {
      cycle++;
      modifyResult();
    } else {
      const nrToAdd = parseInt(line.split(" ")[1]);

      for (let i = 0; i < 2; i++) {
        cycle++;
        modifyResult();
      }

      x += nrToAdd;
    }
  });

  return <div>{result}</div>;
};
