import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  let data = rData.split(/\n/).map((row) => row.split(""));

  data.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (rowIndex === 0 && tileIndex === 1) {
        data[rowIndex][tileIndex] = "E";
      }
      if (data[rowIndex][tileIndex] === ".") {
        data[rowIndex][tileIndex] = "";
      }
    });
  });

  let moves = [{ position: [0, 1], data: data }];

  const totalNrOfMoves = 99999999999999999999999999;

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // const [moveNr, setMoveNr] = useState(7005625); mer än 10 min tror jag, men går.. högsta typ 145
  const [moveNr, setMoveNr] = useState(3300);
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
  let currData = [];
  data.forEach((row) => {
    currData.push([...row]);
  });

  let currNrOfMoves = 0;
  let currPlayerMove = 0;

  let prevData = [];
  let isBusted = false;
  let isPlayerMove = false;
  let bustedMoves = [];
  let highestPosX = 0;

  for (let currMove = 0; currMove < moveNr; currMove++) {
    // if (currMove === 1689) debugger;

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
      // if (currMove === 1689) debugger; //!!!!!!!!!!!!!!!!!!!!!

      // obs! we make sure to make a local copy of the position array
      let position = [
        moves[moves.length - 1].position[0],
        moves[moves.length - 1].position[1],
      ];

      // debugger;
      let longestToGoalAxis;
      if (data[0].length - position[1] > data.length - position[0]) {
        longestToGoalAxis = "x";
      } else {
        longestToGoalAxis = "y";
      }
      // debugger;
      // are we at start? if so try down
      if (position[0] === 0 && position[1] === 1) {
        if (
          !bustedMoves.includes(
            `${moves.length}:${position[0] + 1},${position[1]}`
          ) &&
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
        }
      } else if (longestToGoalAxis === "x") {
        // try ----move right----
        if (
          position[0] >= 1 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1] + 1}`
          ) &&
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] + 1;

          // cant move right... will DOWN right be free next move?
          // If so  ----move down----
        } else if (
          position[0] < data.length - 2 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0] + 1},${position[1]}`
          ) &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0] + 2][position[1] + 1].includes("^") &&
          !data[position[0] + 1][position[1] + 2].includes("<") &&
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
        } else if (
          // cant move right... down not optimal
          // try to stay if possible
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1]}`
          ) &&
          !data[position[0] - 1][position[1] + 1].includes("v") &&
          !data[position[0] + 1][position[1] + 1].includes("^") &&
          !data[position[0]][position[1] + 2].includes("<") &&
          !data[position[0]][position[1]].includes("<") &&
          !data[position[0]][position[1]].includes(">") &&
          !data[position[0]][position[1]].includes("v") &&
          !data[position[0]][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0];
        } else if (
          // cant move right, down and stay is not optimal.. will UP right be free next move?
          // If so  ----move up----
          position[0] > 1 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0] - 1},${position[1]}`
          ) &&
          !data[position[0]][position[1] + 1].includes("^") &&
          !data[position[0] - 2][position[1] + 1].includes("v") && // check for wall up down!!!!!!!
          !data[position[0] - 1][position[1] + 2].includes("<") &&
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
        } else if (
          // Nothing is optimal... try to stay if possible
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1]}`
          ) &&
          !data[position[0]][position[1]].includes("<") &&
          !data[position[0]][position[1]].includes(">") &&
          !data[position[0]][position[1]].includes("v") &&
          !data[position[0]][position[1]].includes("^")
        ) {
          // debugger;
        } else if (
          // have to escape blizzard, try down first
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          position[0] < data.length - 2 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0] + 1},${position[1]}`
          ) &&
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
        } else if (
          // cant go down, try up
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          position[0] > 1 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0] - 1},${position[1]}`
          ) &&
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
        } //else if (
        //   // cant go up, try left
        //   (data[position[0]][position[1]].includes("<") ||
        //     data[position[0]][position[1]].includes(">") ||
        //     data[position[0]][position[1]].includes("v") ||
        //     data[position[0]][position[1]].includes("^")) &&
        //   !ispositionBusted([position[0], position[1] - 1]) &&
        //   !data[position[0]][position[1] - 1].includes("<") &&
        //   !data[position[0]][position[1] - 1].includes(">") &&
        //   !data[position[0]][position[1] - 1].includes("v") &&
        //   !data[position[0]][position[1] - 1].includes("^")
        // ) {
        //   // debugger;
        //   data[position[0]][position[1]] = data[position[0]][
        //     position[1]
        //   ].replace("E", "");
        //   position[1] = position[1] - 1;
        // }
        // // nothing works - busted
        else {
          isBusted = true;
        }
      } else {
        //////////////////////////// We are past pos 137
        // try ----move down----
        if (
          position[0] < data.length - 2 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0] + 1},${position[1]}`
          ) &&
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0] + 1;

          // cant move down... will DOWN right be free next move?
          // If so  ----move right----
        } else if (
          position[1] < data[0].length - 2 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1] + 1}`
          ) &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0] + 2][position[1] + 1].includes("^") &&
          !data[position[0] + 1][position[1] + 2].includes("<") &&
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] + 1;
        } else if (
          // cant move down... right not optimal
          // try to stay if possible
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1]}`
          ) &&
          !data[position[0]][position[1]].includes("v") &&
          !data[position[0] + 2][position[1]].includes("^") &&
          !data[position[0] + 1][position[1] + 1].includes("<") &&
          !data[position[0] + 1][position[1] - 1].includes(">") &&
          !data[position[0]][position[1]].includes("<") &&
          !data[position[0]][position[1]].includes(">") &&
          !data[position[0]][position[1]].includes("v") &&
          !data[position[0]][position[1]].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[0] = position[0];
        } else if (
          // cant move down, right and stay is not optimal.. will DOWN left be free next move?
          // If so  ----move left----
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1 - 1]}`
          ) &&
          !data[position[0] + 2][position[1] - 1].includes("^") &&
          !data[position[0] + 1][position[1] - 2].includes(">") && // check for wall up down!!!!!!!
          !data[position[0] + 1][position[1]].includes("<") &&
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
          // Nothing is optimal... try to stay if possible
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1]}`
          ) &&
          !data[position[0]][position[1]].includes("<") &&
          !data[position[0]][position[1]].includes(">") &&
          !data[position[0]][position[1]].includes("v") &&
          !data[position[0]][position[1]].includes("^")
        ) {
          // debugger;
        } else if (
          // have to escape blizzard, try right first
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          position[1] < data[0].length - 2 &&
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1] + 1}`
          ) &&
          !data[position[0]][position[1] + 1].includes("<") &&
          !data[position[0]][position[1] + 1].includes(">") &&
          !data[position[0]][position[1] + 1].includes("v") &&
          !data[position[0]][position[1] + 1].includes("^")
        ) {
          // debugger;
          data[position[0]][position[1]] = data[position[0]][
            position[1]
          ].replace("E", "");
          position[1] = position[1] + 1;
        } else if (
          // cant go right, try left
          (data[position[0]][position[1]].includes("<") ||
            data[position[0]][position[1]].includes(">") ||
            data[position[0]][position[1]].includes("v") ||
            data[position[0]][position[1]].includes("^")) &&
          !bustedMoves.includes(
            `${moves.length}:${position[0]},${position[1] - 1}`
          ) &&
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
        } //else if (
        //   // cant go up, try left
        //   (data[position[0]][position[1]].includes("<") ||
        //     data[position[0]][position[1]].includes(">") ||
        //     data[position[0]][position[1]].includes("v") ||
        //     data[position[0]][position[1]].includes("^")) &&
        //   !ispositionBusted([position[0], position[1] - 1]) &&
        //   !data[position[0]][position[1] - 1].includes("<") &&
        //   !data[position[0]][position[1] - 1].includes(">") &&
        //   !data[position[0]][position[1] - 1].includes("v") &&
        //   !data[position[0]][position[1] - 1].includes("^")
        // ) {
        //   // debugger;
        //   data[position[0]][position[1]] = data[position[0]][
        //     position[1]
        //   ].replace("E", "");
        //   position[1] = position[1] - 1;
        // }
        // // nothing works - busted
        else {
          isBusted = true;
        }
      }

      if (isBusted) {
        // debugger;

        let currentPos = moves[moves.length - 1].position;
        bustedMoves.push(
          `${moves.length - 1}:${currentPos[0]},${currentPos[1]}`
        );

        // update data with previous move
        data = [];
        moves[moves.length - 1].data.forEach((row) => {
          data.push([...row]);
        });
        // debugger;
        moves.pop();

        data[currentPos[0]][currentPos[1]] = data[currentPos[0]][
          currentPos[1]
        ].replace("E", "");

        position = moves[moves.length - 1].position;

        data.forEach((row, rowIndex) => {
          row.forEach((tile, tileIndex) => {
            if (rowIndex === position[0] && tileIndex === position[1]) {
              if (!data[rowIndex][tileIndex].includes("E")) {
                data[rowIndex][tileIndex] = data[rowIndex][tileIndex] + "E";
              }
            }
          });
        });
        isBusted = false;
      } else {
        // if (moves.length > 13) debugger;

        let currData = [];
        data.forEach((row, rowIndex) => {
          currData.push([...row]);
        });
        // debugger;
        moves.push({ position: [position[0], position[1]], data: currData });
        isPlayerMove = false;

        data.forEach((row, rowIndex) => {
          row.forEach((tile, tileIndex) => {
            if (rowIndex === position[0] && tileIndex === position[1]) {
              if (!data[rowIndex][tileIndex].includes("E")) {
                data[rowIndex][tileIndex] = data[rowIndex][tileIndex] + "E";
              }
            }
          });
        });

        if (position[1] > highestPosX) {
          highestPosX = position[1];
        }

        if (position[1] === 138) {
          // debugger;
        }
      }
    }
  }

  // *********************************************************************************

  return (
    <div style={{ width: "100%" }}>
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
      <div style={{ marginLeft: "3000px", marginTop: "24px", display: "flex" }}>
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
        <div style={{ marginTop: "24px" }}>Move nr: {moveNr}</div>
        <div style={{ marginTop: "24px" }}>
          0: {moves[moves.length - 1].position[0]}
        </div>
        <div style={{ marginTop: "24px" }}>
          1: {moves[moves.length - 1].position[1]}
        </div>
        <div style={{ marginTop: "24px" }}>currPlayerMove: {moves.length}</div>
        <div style={{ marginTop: "24px" }}>highest pos x: {highestPosX}</div>
      </div>
    </div>
  );
};
