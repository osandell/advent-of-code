import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const data = realData.split("");

  let result = null;
  for (let i = 4; i < data.length; i++) {
    const letterChunkSize = 4;
    let letterChunk = [];
    for (let j = i - letterChunkSize; j < i; j++) {
      letterChunk.push(data[j]);
    }

    let letterCounts = {};
    letterChunk.forEach((letter) => {
      if (letterCounts[letter]) {
        letterCounts[letter] += 1;
      } else {
        letterCounts[letter] = 1;
      }
    });

    let hasDoublets = false;
    Object.keys(letterCounts).forEach((key) => {
      if (letterCounts[key] > 1) {
        hasDoublets = true;
      }
    });

    if (!hasDoublets) {
      result = i;
      break;
    }
  }

  return <div>{result}</div>;
};
