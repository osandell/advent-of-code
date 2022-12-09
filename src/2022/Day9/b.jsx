import React from "react";
import exampleData from "./exampleData";
import exampleDataB from "./exampleDataB";
import realData from "./realData";

export default () => {
  const data = realData.split(/\n/).map((row) =>
    row.split(" ").map((item) => {
      return parseInt(item) >= 0 ? parseInt(item) : item;
    })
  );

  const isAdjecent = (part1, part2) =>
    (part1[0] === part2[0] ||
      part1[0] === part2[0] - 1 ||
      part1[0] === part2[0] + 1) &&
    (part1[1] === part2[1] ||
      part1[1] === part2[1] - 1 ||
      part1[1] === part2[1] + 1);

  const logMap = () => {
    let map = "";
    let size = 40;
    for (let y = size / 2 - 1; y >= -size / 2; y--) {
      for (let x = -size / 2; x < size / 2; x++) {
        let partOfRopeOnThisTile;
        for (let j = ROPE_LENGTH - 1; j >= 0; j--) {
          if (x === rope[j][0] && y === rope[j][1]) {
            partOfRopeOnThisTile = j;
          }
        }
        if (partOfRopeOnThisTile === 0) {
          map += "H";
        } else if (partOfRopeOnThisTile) {
          map += partOfRopeOnThisTile.toString();
        } else {
          map += ".";
        }
      }
      map += "\n";
    }
    console.log(map);
  };

  const moveHead = (moveType) => {
    switch (moveType) {
      case "R":
        return (rope[0][0] = rope[0][0] + 1);
      case "L":
        return (rope[0][0] = rope[0][0] - 1);
      case "U":
        return (rope[0][1] = rope[0][1] + 1);
      case "D":
        return (rope[0][1] = rope[0][1] - 1);
    }
  };

  const moveRestOfRope = () => {
    for (let j = 1; j < rope.length; j++) {
      if (!isAdjecent(rope[j], rope[j - 1])) {
        const diffX = rope[j - 1][0] - rope[j][0];
        const diffY = rope[j - 1][1] - rope[j][1];

        if (diffX > 0) {
          rope[j][0] = rope[j][0] + 1;
        } else if (diffX < 0) {
          rope[j][0] = rope[j][0] - 1;
        }

        if (diffY > 0) {
          rope[j][1] = rope[j][1] + 1;
        } else if (diffY < 0) {
          rope[j][1] = rope[j][1] - 1;
        }
      }
    }
  };

  const ROPE_LENGTH = 10;

  let tailVisitedPos = {};
  let rope = [];
  for (let i = 0; i < ROPE_LENGTH; i++) {
    rope.push([0, 0]);
  }

  data.forEach((move) => {
    // logMap();
    const moveType = move[0];
    const nrOfMovesInCurrentDirection = move[1];
    for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
      moveHead(moveType);
      moveRestOfRope();

      tailVisitedPos[
        rope[ROPE_LENGTH - 1].toString() +
          ":" +
          rope[ROPE_LENGTH - 1].toString()
      ] = true;
    }
  });

  const result = Object.keys(tailVisitedPos).length;

  // 2487
  return <div>{result}</div>;
};
