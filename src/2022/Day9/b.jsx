import React from "react";
import exampleData from "./exampleDataB";
import realData from "./realData";

const isAdjecent = (tail, head) => {
  const res =
    (tail[0] === head[0] ||
      tail[0] === head[0] - 1 ||
      tail[0] === head[0] + 1) &&
    (tail[1] === head[1] || tail[1] === head[1] - 1 || tail[1] === head[1] + 1);
  return res;
};

export default () => {
  const data = exampleData.split(/\n/).map((row) =>
    row.split(" ").map((item) => {
      return parseInt(item) >= 0 ? parseInt(item) : item;
    })
  );

  let tailVisitedPos = {};
  const ropeLength = 10;
  let rope = [];
  let lastPositions = [];
  for (let i = 0; i < ropeLength; i++) {
    rope.push([0, 0]);
    lastPositions.push([0, 0]);
  }

  // debugger;
  data.forEach((move) => {
    let map = "";
    let size = 20;
    // for (var y = 0; y < size; y++) {
    for (var y = size - 1; y >= 0; y--) {
      for (var x = 0; x < size; x++) {
        if (x === rope[0][0] && y === rope[0][1]) {
          map += "H";
        } else if (x === rope[1][0] && y === rope[1][1]) {
          map += "1";
        } else if (x === rope[2][0] && y === rope[2][1]) {
          map += "2";
        } else if (x === rope[3][0] && y === rope[3][1]) {
          map += "3";
        } else if (x === rope[4][0] && y === rope[4][1]) {
          map += "4";
        } else if (x === rope[5][0] && y === rope[5][1]) {
          map += "5";
        } else if (x === rope[6][0] && y === rope[6][1]) {
          map += "6";
        } else if (x === rope[7][0] && y === rope[7][1]) {
          map += "7";
        } else if (x === rope[8][0] && y === rope[8][1]) {
          map += "8";
        } else if (x === rope[9][0] && y === rope[9][1]) {
          map += "9";
        } else {
          map += ".";
        }
      }
      map += "\n";
    }
    // console.log(map);

    for (let i = 0; i < move[1]; i++) {
      for (let j = 0; j < ropeLength; j++) {
        lastPositions[j] = [...rope[j]];
      }

      switch (move[0]) {
        case "R":
          rope[0][0] = rope[0][0] + 1;
          break;
        case "L":
          rope[0][0] = rope[0][0] - 1;
          break;
        case "U":
          rope[0][1] = rope[0][1] + 1;
          break;
        case "D":
          rope[0][1] = rope[0][1] - 1;
          break;
      }

      let diffX;
      let diffY;
      for (let j = 1; j < rope.length; j++) {
        if (!isAdjecent(rope[j], rope[j - 1])) {
          if (j === 1) {
            rope[j] = lastPositions[j - 1];
            diffX = rope[j - 1][0] - lastPositions[j - 1][0];
            diffY = rope[j - 1][1] - lastPositions[j - 1][1];

            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                diffX    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 93 \n",
              "color: white; background: black; font-weight: bold",
              "",
              diffX
            );

            console.log(
              "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c                diffY    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 101 \n",
              "color: white; background: black; font-weight: bold",
              "",
              diffY
            );
          } else {
            switch (move[0]) {
              case "R":
                rope[j][0] = rope[j][0] + 1;
                break;
              case "L":
                rope[j][0] = rope[j][0] - 1;
                break;
              case "U":
                rope[j][1] = rope[j][1] + 1;
                break;
              case "D":
                rope[j][1] = rope[j][1] - 1;
                break;
            }
          }
        }
      }

      tailVisitedPos[rope[9].toString() + ":" + rope[9].toString()] = true;
    }
  });

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      rope    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 60 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   rope
  // );

  const result = Object.keys(tailVisitedPos).length;

  return <div>{result}</div>;
};
