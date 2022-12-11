import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = eData
  .split("\n\n")
  .map((monkeyChunk) => monkeyChunk.split("\n"))
  .map((line, index) => {
    const funcs = [
      (old) => old * 19,
      (old) => old + 6,
      (old) => old * old,
      (old) => old + 3,
    ];

    // const funcs = [
    //   (old) => old * 13,
    //   (old) => old + 4,
    //   (old) => old * 11,
    //   (old) => old + 8,
    //   (old) => old * old,
    //   (old) => old + 5,
    //   (old) => old + 1,
    //   (old) => old + 3,
    // ];

    return {
      monkeyNr: parseInt(line[0].split(" ")[1]),
      items: line[1]
        .split(": ")[1]
        .split(", ")
        .map((nr) => parseInt(nr)),
      operation: funcs[index],
      test: parseInt(line[3].split("by ")[1]),
      true: parseInt(line[4].split("monkey ")[1]),
      false: parseInt(line[5].split("monkey ")[1]),
      inspectedTimes: 0,
    };
  });

const isAdjecent = (part1, part2) =>
  (part1[0] === part2[0] ||
    part1[0] === part2[0] - 1 ||
    part1[0] === part2[0] + 1) &&
  (part1[1] === part2[1] ||
    part1[1] === part2[1] - 1 ||
    part1[1] === part2[1] + 1);

export default () => {
  let currMove = 0;

  // let totalNrOfMoves = 0;
  // for (let i = 0; i < data.length; i++) {
  //   const move = data[i];
  //   const nrOfMovesInCurrentDirection = move[1];
  //   for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
  //     totalNrOfMoves++;
  //   }
  // }
  const totalNrOfMoves = data.length;

  const [moveNr, setMoveNr] = useState(totalNrOfMoves);
  const moveNrRef = React.useRef(moveNr);
  moveNrRef.current = moveNr;

  const startPlaying = () => {
    if (moveNr < totalNrOfMoves) {
      const timer = setInterval(() => {
        moveNrRef.current < totalNrOfMoves
          ? setMoveNr(moveNrRef.current + 1)
          : clearInterval(timer);
      }, 30);
    }
  };

  // *********************************************************************************

  for (let j = 0; j < 20; j++) {
    for (let i = 0; i < data.length; i++) {
      if (currMove === moveNr) {
        break;
      }

      data[i].items.forEach((item) => {
        let worryLevel = item;

        worryLevel = data[i].operation(worryLevel);
        // i === 3 &&
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    worryLevel    \x1b[8m\x1b[40m\x1b[0m\n",
        //     "color: white; background: black; font-weight: bold",
        //     worryLevel
        //   );
        worryLevel = Math.floor(worryLevel / 3);
        // i === 3 &&
        //   console.log(
        //     "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    worryLevel    \x1b[8m\x1b[40m\x1b[0m\n",
        //     "color: white; background: black; font-weight: bold",
        //     worryLevel
        //   );

        if (worryLevel % data[i].test === 0) {
          data[data[i].true].items.push(worryLevel);
        } else {
          data[data[i].false].items.push(worryLevel);
        }
        data[i].items = [];
        data[i].inspectedTimes = data[i].inspectedTimes + 1;
      });

      const move = data[i];
    }
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      data    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 103 \n",
    "color: white; background: black; font-weight: bold",
    "",
    data
  );

  let highest = 0;
  let highMonkey;
  let nextHighest = 0;
  data.forEach((monkey) => {
    if (monkey.inspectedTimes > highest) {
      highest = monkey.inspectedTimes;
      highMonkey = monkey.monkeyNr;
    }
  });
  data.forEach((monkey) => {
    if (monkey.inspectedTimes > nextHighest && monkey.monkeyNr !== highMonkey) {
      nextHighest = monkey.inspectedTimes;
    }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      nextHighest    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 131 \n",
    "color: white; background: black; font-weight: bold",
    "",
    nextHighest
  );

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      highMonkey    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 126 \n",
    "color: white; background: black; font-weight: bold",
    "",
    highMonkey
  );

  const dataToRender = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
    ["9", "10", "11", "12"],
  ];

  let result = highest * nextHighest;

  // *********************************************************************************

  return (
    <div>
      <Render
        dataToRender={data}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"11px"}
        sizeY={"15px"}
        isCenterOrigin={false}
      />
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={() => moveNr > 0 && setMoveNr(0)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Beginning
        </button>
        <button
          onClick={() => moveNr > 9 && setMoveNr(moveNr - 10)}
          style={{
            marginRight: "8px",
            color: moveNr > 9 ? "black" : "lightGray",
          }}
        >
          Prev 10
        </button>
        <button
          onClick={() => moveNr > 0 && setMoveNr(moveNr - 1)}
          style={{
            marginRight: "8px",
            color: moveNr > 0 ? "black" : "lightGray",
          }}
        >
          Prev
        </button>
        <button
          onClick={() => startPlaying()}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Play
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(moveNr + 1)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          Next
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves - 9 && setMoveNr(moveNr + 10)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves - 9 ? "black" : "lightGray",
          }}
        >
          Next 10
        </button>
        <button
          onClick={() => moveNr < totalNrOfMoves && setMoveNr(totalNrOfMoves)}
          style={{
            marginRight: "8px",
            color: moveNr < totalNrOfMoves ? "black" : "lightGray",
          }}
        >
          End
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>Move nr: {moveNr}</div>
      <div style={{ marginTop: "24px" }}>Result: {result}</div>
    </div>
  );
};
