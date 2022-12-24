import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const isAdjecent = (part1, part2) =>
  (part1[0] === part2[0] ||
    part1[0] === part2[0] - 1 ||
    part1[0] === part2[0] + 1) &&
  (part1[1] === part2[1] ||
    part1[1] === part2[1] - 1 ||
    part1[1] === part2[1] + 1);

export default () => {
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  let data = rData.split(/\n/).map((row) => row.split(""));
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  let position = [0, 1];
  data.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (rowIndex === position[0] && tileIndex === position[1]) {
        data[rowIndex][tileIndex] = "E";
      }
      if (data[rowIndex][tileIndex] === ".") {
        data[rowIndex][tileIndex] = "";
      }
    });
  });

  let init = () => {
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    data = rData.split(/\n/).map((row) => row.split(""));
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    position = [0, 1];
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (rowIndex === position[0] && tileIndex === position[1]) {
          data[rowIndex][tileIndex] = "E";
        }
        if (data[rowIndex][tileIndex] === ".") {
          data[rowIndex][tileIndex] = "";
        }
      });
    });
  };

  init();

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

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // const [moveNr, setMoveNr] = useState(7005625); mer än 10 min tror jag, men går.. högsta typ 145
  const [moveNr, setMoveNr] = useState(30);
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
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

  let highestX = 0;
  let result = 0;
  let moves = [];

  let currNrOfMoves = 0;
  let currPlayerMove = 0;

  let prevData = [];
  let currMove2 = 0;
  let isBusted = false;
  let isPlayerMove = false;
  let currPath = [];
  let bustedPaths = [];
  let isNextMoveBusted = (nextMove) => {
    let res = `${currPlayerMove - 1}:${nextMove[0]},${nextMove[1]}`;

    // if (currMove2 === 32) debugger;

    return bustedPaths.includes(res);
  };

  for (let currMove = 0; currMove < moveNr; currMove++) {
    currNrOfMoves++;

    // if (currMove === 825) debugger;

    currMove2 = currMove;
    if (!isPlayerMove) {
      prevData = [];
      data.forEach((row, rowIndex) => {
        prevData.push([...row]);
      });

      // for (let i = 0; i < 5; i++) {
      data.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
          if (
            data[rowIndex][tileIndex].includes("<") &&
            (!data[rowIndex][tileIndex].includes("<t") ||
              data[rowIndex][tileIndex].split("<").length - 1 > 1)
          ) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "<",
              ""
            );
            if (tileIndex > 1) {
              data[rowIndex][tileIndex - 1] =
                data[rowIndex][tileIndex - 1] + "<";
            } else {
              // debugger;
              data[rowIndex][data[0].length - 2] =
                data[rowIndex][data[0].length - 2] + "<t";
            }
          }
          if (
            data[rowIndex][tileIndex].includes("^") &&
            (!data[rowIndex][tileIndex].includes("^t") ||
              data[rowIndex][tileIndex].split("^").length - 1 > 1)
          ) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "^",
              ""
            );
            if (rowIndex > 1) {
              data[rowIndex - 1][tileIndex] =
                data[rowIndex - 1][tileIndex] + "^";
            } else {
              // debugger;
              data[data.length - 2][tileIndex] =
                data[data.length - 2][tileIndex] + "^t";
            }
          }
        });
      });

      // debugger;
      for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
        for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
          // if (moveNr - 1 === currMove) debugger;
          if (
            data[rowIndex][tileIndex].includes(">") &&
            (!data[rowIndex][tileIndex].includes(">t") ||
              data[rowIndex][tileIndex].split(">").length - 1 > 1)
          ) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              ">",
              ""
            );
            if (tileIndex < data[0].length - 2) {
              data[rowIndex][tileIndex + 1] =
                data[rowIndex][tileIndex + 1] + ">";
            } else {
              // debugger;
              data[rowIndex][1] = data[rowIndex][1] + ">t";
            }
          }
          if (
            data[rowIndex][tileIndex].includes("v") &&
            (!data[rowIndex][tileIndex].includes("vt") ||
              data[rowIndex][tileIndex].split("v").length - 1 > 1)
          ) {
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "v",
              ""
            );
            // debugger;
            if (rowIndex < data.length - 2) {
              data[rowIndex + 1][tileIndex] =
                data[rowIndex + 1][tileIndex] + "v";
            } else {
              // debugger;
              data[1][tileIndex] = data[1][tileIndex] + "vt";
            }
          }
        }
      }

      // Clean up
      for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
        for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
          if (data[rowIndex][tileIndex].includes(">t")) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              ">t",
              ">"
            );
          }
          if (data[rowIndex][tileIndex].includes("vt")) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "vt",
              "v"
            );
          }
          if (data[rowIndex][tileIndex].includes("<t")) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "<t",
              "<"
            );
          }
          if (data[rowIndex][tileIndex].includes("^t")) {
            // debugger;
            data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
              "^t",
              "^"
            );
          }
        }
      }
      isPlayerMove = true;
    } else {
      // Move player
      currPlayerMove++;

      // debugger;
      let longestToGoalAxis;
      if (data[0].length - position[1] > data.length - position[0]) {
        longestToGoalAxis = "x";
      } else {
        longestToGoalAxis = "y";
      }

      // if (currMove === 32) debugger; //!!!!!!!!!!!!!!!!!!!!!
      if (longestToGoalAxis === "x") {
        // try move right
        // debugger;
        // are we at start? if so try down
        let foundNewPos = false;
        if (
          position[0] === 0 &&
          position[1] === 1 &&
          !isNextMoveBusted([position[0] + 1, position[1]]) &&
          !data[position[0] + 2][position[1]].includes("^") &&
          !data[position[0] + 1][position[1]].includes("<") &&
          !data[position[0] + 1][position[1]].includes(">") &&
          !data[position[0] + 1][position[1]].includes("v") &&
          !data[position[0] + 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] + 1;
          foundNewPos = true;
        } else if (
          position[0] >= 1 &&
          !isNextMoveBusted([position[0], position[1] + 1]) &&
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] + 1;
          foundNewPos = true;

          // cant move right... will DOWN right be free next move?
        } else if (
          position[0] < data.length - 2 &&
          !isNextMoveBusted([position[0] + 1, position[1]]) &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0] + 2][position[1] + 1].includes("^") &&
          !data[position[0] + 1][position[1] + 2].includes("<") &&
          !data[position[0] + 2][position[1]].includes("^") &&
          !data[position[0] + 1][position[1]].includes("<") &&
          !data[position[0] + 1][position[1]].includes(">") &&
          !data[position[0] + 1][position[1]].includes("v") &&
          !data[position[0] + 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] + 1;
          foundNewPos = true;
        } else if (
          // cant move right, down is not optimal.. will UP right be free next move?
          position[0] > 1 &&
          !isNextMoveBusted([position[0] - 1, position[1]]) &&
          !data[position[0]][position[1] + 1].includes("^") &&
          !data[position[0] - 2][position[1] + 1].includes("v") && // check for wall up down!!!!!!!
          !data[position[0] - 1][position[1] + 2].includes("<") &&
          !data[position[0] + 1][position[1]].includes("<") &&
          !data[position[0] + 1][position[1]].includes(">") &&
          !data[position[0] + 1][position[1]].includes("v") &&
          !data[position[0] + 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] - 1;
          foundNewPos = true;
        } else if (
          // have to escape blizzard, try down first
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          position[0] < data.length - 2 &&
          !isNextMoveBusted([position[0] + 1, position[1]]) &&
          !data[position[0] + 1][position[1]].includes("<") &&
          !data[position[0] + 1][position[1]].includes(">") &&
          !data[position[0] + 1][position[1]].includes("v") &&
          !data[position[0] + 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] + 1;
          foundNewPos = true;
        } else if (
          // have to escape blizzard, try up
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          position[0] > 1 &&
          !isNextMoveBusted([position[0] - 1, position[1]]) &&
          !data[position[0] - 1][position[1]].includes("<") &&
          !data[position[0] - 1][position[1]].includes(">") &&
          !data[position[0] - 1][position[1]].includes("v") &&
          !data[position[0] - 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] - 1;
          foundNewPos = true;
        } else if (
          // have to escape blizzard, try move left
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          !isNextMoveBusted([position[0], position[1] - 1]) &&
          !data[position[0]][position[1] - 1].includes("<") &&
          !data[position[0]][position[1] - 1].includes(">") &&
          !data[position[0]][position[1] - 1].includes("v") &&
          !data[position[0]][position[1] - 1].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] - 1;
          foundNewPos = true;
        } else if (
          // busted
          data[position[0]][position[1]].includes("<") ||
          data[position[0]][position[1]].includes(">") ||
          data[position[0]][position[1]].includes("v") ||
          data[position[0]][position[1]].includes("^")
        ) {
          // debugger;

          console.log(
            "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              currPath    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 400 \n",
            "color: white; background: black; font-weight: bold",
            "",
            currPath
          );
          bustedPaths.push(
            `${currPlayerMove - 2}:${position[0]},${position[1]}`
          );
          if (position[1] > highestX) {
            highestX = position[1];
          }

          data = [];
          prevData.forEach((row, rowIndex) => {
            data.push([...row]);
          });
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position = currPath[currPath.length - 2];
          currPlayerMove -= 2;
          currPath.pop();
          currNrOfMoves--;
          // currMove--;
          isBusted = true;
        }
        // else just wait, unless that's doomed
        if (!foundNewPos && isNextMoveBusted([position[0], position[1]])) {
          // bustedPaths.push(currPath.join(":"));
          // if (position[1] > highestX) {
          //   highestX = position[1];
          // }
          // position = currPath[currPath.length - 2];
          // data = [];
          // prevData.forEach((row, rowIndex) => {
          //   data.push([...row]);
          // });
          // currPath.pop();
          // currNrOfMoves--;
        }
      } else {
        // try move down
        // debugger;
        if (
          !data[position[0] + 1][position[1]].includes("<") &&
          !data[position[0] + 1][position[1]].includes(">") &&
          !data[position[0] + 1][position[1]].includes("v") &&
          !data[position[0] + 1][position[1]].includes("^")
        ) {
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] + 1;
        } else if (
          // try move right
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] + 1;
        } else if (
          // have to escape blizzard, try left first
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          !data[position[0]][position[1] - 1].includes("<") &&
          !data[position[0]][position[1] - 1].includes(">") &&
          !data[position[0]][position[1] - 1].includes("v") &&
          !data[position[0]][position[1] - 1].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] - 1;
        } else if (
          // have to escape blizzard, try move up
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          !data[position[0] - 1][position[1]].includes("<") &&
          !data[position[0] - 1][position[1]].includes(">") &&
          !data[position[0] - 1][position[1]].includes("v") &&
          !data[position[0] - 1][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] - 1;
        }
        // else just wait
      }

      data.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
          if (rowIndex === position[0] && tileIndex === position[1]) {
            if (!data[rowIndex][tileIndex].includes("E")) {
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex] + "E";
            }
          }
          if (data[rowIndex][tileIndex] === ".") {
            data[rowIndex][tileIndex] = "";
          }
        });
      });

      currPath.push([position[0], position[1]]);
      let currData = [];
      data.forEach((row, rowIndex) => {
        currData.push([...row]);
      });

      moves.push({ position: [position[0], position[1]], data: currData });
      if (!isBusted) {
        isPlayerMove = false;
      } else {
        isBusted = false;

        console.log(
          "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c            bustedPaths    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 528 \n",
          "color: white; background: black; font-weight: bold",
          "",
          bustedPaths
        );
      }

      console.log(
        "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        moves    \x1b[8m\x1b[40m\x1b[0m%c a.jsx 122 \n",
        "color: white; background: black; font-weight: bold",
        "",
        moves
      );
    }
  }

  // *********************************************************************************

  return (
    <div>
      <Render
        dataToRender={data}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"20px"}
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
      <div style={{ marginTop: "24px" }}>0: {position[0]}</div>
      <div style={{ marginTop: "24px" }}>1: {position[1]}</div>
      <div style={{ marginTop: "24px" }}>leny: {data.length}</div>
      <div style={{ marginTop: "24px" }}>currPlayerMove: {currPlayerMove}</div>
      <div style={{ marginTop: "24px" }}>lenx: {data[0].length}</div>
      <div style={{ marginTop: "24px" }}>highestX: {highestX}</div>
      <div style={{ marginTop: "24px" }}>currNrOfMoves: {currNrOfMoves}</div>
    </div>
  );
};
