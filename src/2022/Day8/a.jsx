import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const rows = realData.split("\n");
  let columns = [];
  let nrOfVisibleTrees = rows.length * 2 + rows[0].length * 2 - 4;
  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows[j].length - 1; j++) {
      const curHeight = rows[i][j];

      // check upwards
      let isCurrentHighestUp = true;
      for (let k = i; k > 0; k--) {
        if (rows[k - 1][j] >= curHeight) {
          isCurrentHighestUp = false;
        }
      }

      // check downwards
      let isCurrentHighestDown = true;
      for (let k = i; k < rows.length - 1; k++) {
        if (rows[k + 1][j] >= curHeight) {
          isCurrentHighestDown = false;
        }
      }

      // check left
      let isCurrentHighestLeft = true;
      for (let k = j; k > 0; k--) {
        if (rows[i][k - 1] >= curHeight) {
          isCurrentHighestLeft = false;
        }
      }

      // check right
      let isCurrentHighestRight = true;
      for (let k = j; k < rows[0].length - 1; k++) {
        if (rows[i][k + 1] >= curHeight) {
          isCurrentHighestRight = false;
        }
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

  const result = nrOfVisibleTrees;

  return <div>{result}</div>;
};
