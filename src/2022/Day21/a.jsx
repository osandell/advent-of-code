import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

let eeData = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

const data = eeData.split(/\n/);

let monkeys = {};
for (let i = 0; i < 500; i++) {
  // if (i % 10 === 0) console.log(i);
  monkeys = {};
  data.forEach((row, rowIndex) => {
    let number = row.split(":")[0] === "humn" ? i : parseInt(row.split(" ")[1]);

    let operation = null;
    let otherMonkeys = [];
    if (number > -1) {
    } else {
      operation = row.split(":")[0] === "root" ? "=" : row.split(" ")[2];
      otherMonkeys = [row.split(" ")[1], row.split(" ")[3]];
    }

    monkeys[row.split(":")[0]] = {
      operation: operation,
      result: number > -1 ? number : null,
      otherMonkeys: otherMonkeys,
      resultDone: number > -1,
    };
  });

  let done = false;
  // debugger;
  while (!done) {
    Object.keys(monkeys).forEach((monkeyId) => {
      if (monkeys[monkeyId].resultDone) {
        return;
      }

      let operation = monkeys[monkeyId].operation;
      let monkey1 = monkeys[monkeys[monkeyId].otherMonkeys[0]];
      let monkey2 = monkeys[monkeys[monkeyId].otherMonkeys[1]];
      if (monkey1.resultDone && monkey2.resultDone) {
        if (operation === "+") {
          monkeys[monkeyId].result = monkey1.result + monkey2.result;
          monkeys[monkeyId].resultDone = true;
        }
        if (operation === "-") {
          monkeys[monkeyId].result = monkey1.result - monkey2.result;
          monkeys[monkeyId].resultDone = true;
        }
        if (operation === "*") {
          monkeys[monkeyId].result = monkey1.result * monkey2.result;
          monkeys[monkeyId].resultDone = true;
        }
        if (operation === "/") {
          monkeys[monkeyId].result = monkey1.result / monkey2.result;
          monkeys[monkeyId].resultDone = true;
        }
        if (operation === "=") {
          monkeys[monkeyId].result =
            monkey1.result === monkey2.result ? -111 : -222;
          monkeys[monkeyId].resultDone = true;
        }
      }
    });

    done = true;
    Object.keys(monkeys).forEach((monkeyId) => {
      if (!monkeys[monkeyId].resultDone) {
        done = false;
      }
    });
  }

  if (monkeys["root"].result === -111) {
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    monkeys    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 70 \n",
      "color: white; background: black; font-weight: bold",
      "",
      monkeys["humn"].result
    );
  }
}

console.log(
  "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    done    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 90 \n",
  "color: white; background: black; font-weight: bold",
  ""
);

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
  const totalNrOfMoves = 99999999999999999999999999;

  const [moveNr, setMoveNr] = useState(0);
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

  let result = 0;

  // *********************************************************************************

  return <div></div>;
};
