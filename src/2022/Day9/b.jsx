import React, { useState } from "react";
import exampleData from "./exampleData";
import exampleDataB from "./exampleDataB";
import realData from "./realData";

const MAP_SIZE = 40;
const ROPE_LENGTH = 10;

let tailVisitedPos = {};
let rope = [];
for (let i = 0; i < ROPE_LENGTH; i++) {
  rope.push([0, 0]);
}

const data = exampleDataB.split(/\n/).map((row) =>
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
  for (let y = MAP_SIZE / 2 - 1; y >= -MAP_SIZE / 2; y--) {
    for (let x = -MAP_SIZE / 2; x < MAP_SIZE / 2; x++) {
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

const renderMapLine = (y) => {
  let line = [];
  for (let x = -MAP_SIZE / 2; x < MAP_SIZE / 2; x++) {
    let partOfRopeOnThisTile;
    for (let j = ROPE_LENGTH - 1; j >= 0; j--) {
      if (x === rope[j][0] && y === rope[j][1]) {
        partOfRopeOnThisTile = j;
      }
    }
    const key = x.toString() + ":" + y.toString();
    const styling = {
      width: "10px",
      height: "10px",
      fontSize: "10px",
      lineHeight: "10px",
      background: "beige",
      margin: "1px",
    };
    if (partOfRopeOnThisTile === 0) {
      line.push(
        <div style={styling} key={key}>
          H
        </div>
      );
    } else if (partOfRopeOnThisTile) {
      line.push(
        <div style={styling} key={key}>
          {partOfRopeOnThisTile.toString()}
        </div>
      );
    } else {
      line.push(<div style={styling} key={key}></div>);
    }
  }
  return line;
};

const renderMap = () => {
  let map = [];
  for (let y = MAP_SIZE / 2 - 1; y >= -MAP_SIZE / 2; y--) {
    map.push(
      <div key={y.toString()} style={{ display: "flex" }}>
        {renderMapLine(y)}{" "}
      </div>
    );
  }
  return map;
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

export default () => {
  const [moveNr, setMoveNr] = useState(0);

  let currMove = 0;

  for (let i = 0; i < data.length; i++) {
    const move = data[i];
    logMap();
    const moveType = move[0];
    const nrOfMovesInCurrentDirection = move[1];
    for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
      if (currMove === moveNr) {
        break;
      }

      moveHead(moveType);
      moveRestOfRope();

      tailVisitedPos[
        rope[ROPE_LENGTH - 1].toString() +
          ":" +
          rope[ROPE_LENGTH - 1].toString()
      ] = true;

      currMove++;
    }
    if (currMove === moveNr) {
      break;
    }
  }

  const result = Object.keys(tailVisitedPos).length;

  // 2487
  return (
    <div>
      <div>{renderMap()}</div>
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => setMoveNr(moveNr - 10)}
          style={{ marginRight: "8px" }}
        >
          Prev 10
        </button>
        <button
          onClick={() => setMoveNr(moveNr - 1)}
          style={{ marginRight: "8px" }}
        >
          Prev
        </button>
        <button
          onClick={() => setMoveNr(moveNr + 1)}
          style={{ marginRight: "8px" }}
        >
          Next
        </button>
        <button
          onClick={() => setMoveNr(moveNr + 10)}
          style={{ marginRight: "8px" }}
        >
          Next 10
        </button>
      </div>
    </div>
  );
};
