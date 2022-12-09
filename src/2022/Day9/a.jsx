import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  const data = realData.split(/\n/).map((row) =>
    row.split(" ").map((item) => {
      return parseInt(item) >= 0 ? parseInt(item) : item;
    })
  );

  let tailVisitedPos = {};
  let head = [0, 0];
  let headLastPos = [0, 0];
  let tail = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  let lastMove = data[0][0];
  let didJustTurn = false;
  let lastDidJustTurn = false;

  const isAdjecent = (tail, head) => {
    return (
      ((tail[0] === head[0] ||
        tail[0] === head[0] - 1 ||
        tail[0] === head[0] + 1) &&
        (tail[1] === head[1] ||
          tail[1] === head[1] - 1 ||
          tail[1] === head[1] + 1)) ||
      ((tail[0] === head[0] ||
        tail[0] === head[0] - 1 ||
        tail[0] === head[0] + 1) &&
        (tail[1] === head[1] ||
          tail[1] === head[1] - 1 ||
          tail[1] === head[1] + 1))
    );
  };

  data.forEach((move) => {
    for (let i = 0; i < move[1]; i++) {
      headLastPos = [...head];

      switch (move[0]) {
        case "R":
          head[0] = head[0] + 1;
          break;
        case "L":
          head[0] = head[0] - 1;
          break;
        case "U":
          head[1] = head[1] + 1;
          break;
        case "D":
          head[1] = head[1] - 1;
          break;
      }

      lastDidJustTurn = didJustTurn;
      didJustTurn = lastMove !== move[0];

      if (lastDidJustTurn) {
        didJustTurn = false;
        // lastDidJustTurn = false;
      }

      lastMove = move[0];

      const isTailAdjecent = isAdjecent(tail, head);

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      head    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 35 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   head
      // );

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          didJustTurn    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 54 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   didJustTurn
      // );

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        isTailAdjecent    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 44 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   isTailAdjecent
      // );

      if (!didJustTurn && !isTailAdjecent) {
        tail = headLastPos;
      }

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          tail    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 72 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   tail[0].toString() + tail[1].toString()
      // );

      // console.log(
      //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c          head    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 80 \n",
      //   "color: white; background: black; font-weight: bold",
      //   "",
      //   head,
      //   tail
      // );

      let map = "";
      for (var y = 20; y > 0; y--) {
        for (var x = 0; x < 20; x++) {
          if (x === head[0] && y === head[1]) {
            map += "H";
          } else if (x === tail[0] && y === tail[1]) {
            map += "T";
          } else {
            map += ".";
          }
        }
        map += "\n";
      }

      // console.log(map);

      tailVisitedPos[tail[0].toString() + ":" + tail[1].toString()] = true;
    }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    data.length    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 110 \n",
    "color: white; background: black; font-weight: bold",
    "",
    data.reduce((acc, row) => acc + row[1], 0)
  );

  // console.log(
  //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      tailVisitedPos    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 84 \n",
  //   "color: white; background: black; font-weight: bold",
  //   "",
  //   Object.keys(tailVisitedPos)
  // );

  const result = Object.keys(tailVisitedPos).length;

  return <div>{result}</div>;
};
