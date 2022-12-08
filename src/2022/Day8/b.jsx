import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const rows = realData.split("\n");
  let columns = [];
  let highScore = 0;
  let nrOfVisibleTrees = rows.length * 2 + rows[0].length * 2 - 4;
  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows[j].length - 1; j++) {
      const curHeight = rows[i][j];

      // check upwards
      let isCurrentHighestUp = true;
      let upCount = 0;
      for (let k = i; k > 0; k--) {
        isCurrentHighestUp && upCount++;
        if (rows[k - 1][j] >= curHeight) {
          isCurrentHighestUp = false;
        }
      }

      // check downwards
      let isCurrentHighestDown = true;
      let downCount = 0;
      for (let k = i; k < rows.length - 1; k++) {
        isCurrentHighestDown && downCount++;
        if (rows[k + 1][j] >= curHeight) {
          isCurrentHighestDown = false;
        }
      }

      // check left
      let isCurrentHighestLeft = true;
      let leftCount = 0;
      for (let k = j; k > 0; k--) {
        isCurrentHighestLeft && leftCount++;
        if (rows[i][k - 1] >= curHeight) {
          isCurrentHighestLeft = false;
        }
      }

      // check right
      let isCurrentHighestRight = true;
      let rightCount = 0;
      for (let k = j; k < rows[0].length - 1; k++) {
        isCurrentHighestRight && rightCount++;
        if (rows[i][k + 1] >= curHeight) {
          isCurrentHighestRight = false;
        }
      }

      const score = upCount * downCount * leftCount * rightCount;
      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    score    \x1b[8m\x1b[40m\x1b[0m\n",
        "color: white; background: black; font-weight: bold",
        score
      );

      if (score > highScore) {
        highScore = score;
      }

      if (
        isCurrentHighestLeft ||
        isCurrentHighestRight ||
        isCurrentHighestDown ||
        isCurrentHighestUp
      ) {
        nrOfVisibleTrees++;
      }
    }
  }

  const result = highScore;

  return <div>{result}</div>;
};
