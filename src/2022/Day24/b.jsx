import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import fiftyData from "./fifty";
import Render from "../../Render";

export default () => {
  let data = rData.split(/\n/).map((row) => row.split(""));

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // const [moveNr, setMoveNr] = useState(7005625); mer än 10 min tror jag, men går.. högsta typ 145
  // const [moveNr, setMoveNr] = useState(1409);
  // const [moveNr, setMoveNr] = useState(680);
  const [moveNr, setMoveNr] = useState(950);
  // const [moveNr, setMoveNr] = useState(2192);
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

  data.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile === ".") {
        data[rowIndex][tileIndex] = "";
      }
    });
  });
  let currData = [];
  data.forEach((row) => {
    currData.push([...row]);
  });

  let hasTurnedBackHome = false;
  let hasCoughtCandy = false;

  let totalNrOfMoves = 99999999999999;

  const check = (y, x, rowIndex, tileIndex, i) => {
    if (
      data[y] &&
      data[y][x] &&
      data[y][x].includes("old") &&
      !data[rowIndex][tileIndex].includes("new") &&
      !data[rowIndex][tileIndex].includes("<") &&
      !data[rowIndex][tileIndex].includes(">") &&
      !data[rowIndex][tileIndex].includes("^") &&
      !data[rowIndex][tileIndex].includes("v") &&
      !data[rowIndex][tileIndex].includes("#")
    ) {
      if (
        rowIndex === data.length - 1 &&
        tileIndex === data[0].length - 2 &&
        !hasTurnedBackHome
      ) {
        // debugger;
        data.forEach((row, rowIndex) => {
          row.forEach((tile, tileIndex) => {
            if (data[rowIndex][tileIndex].includes("old:")) {
              // debugger;
              let nr = data[rowIndex][tileIndex].split("old:")[1].split("]")[0];
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                nr,
                ""
              );
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                "old:]",
                ""
              );
            }

            if (data[rowIndex][tileIndex].includes("new:")) {
              let nr = data[rowIndex][tileIndex].split("new:")[1].split("]")[0];
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                nr,
                ""
              );
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                "new:]",
                ""
              );
            }
          });
        });
        hasTurnedBackHome = true;
      }

      if (
        rowIndex === 0 &&
        tileIndex === 1 &&
        hasTurnedBackHome &&
        !hasCoughtCandy
      ) {
        // debugger;
        data.forEach((row, rowIndex) => {
          row.forEach((tile, tileIndex) => {
            if (data[rowIndex][tileIndex].includes("old:")) {
              // debugger;
              let nr = data[rowIndex][tileIndex].split("old:")[1].split("]")[0];
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                nr,
                ""
              );
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                "old:]",
                ""
              );
            }

            if (data[rowIndex][tileIndex].includes("new:")) {
              let nr = data[rowIndex][tileIndex].split("new:")[1].split("]")[0];
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                nr,
                ""
              );
              data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
                "new:]",
                ""
              );
            }
          });
        });
        hasCoughtCandy = true;
      }

      data[rowIndex][tileIndex] =
        data[rowIndex][tileIndex] + "new:[" + i.toString() + "]";
      return true;
    }

    return false;
  };

  data[0][1] = "0";

  for (let currMove = 1; currMove <= moveNr; currMove++) {
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (
          data[rowIndex][tileIndex].includes("<") &&
          (!data[rowIndex][tileIndex].includes("<t") ||
            data[rowIndex][tileIndex].split("<").length - 1 > 1)
        ) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "<",
            ""
          );
          if (tileIndex > 1) {
            data[rowIndex][tileIndex - 1] = data[rowIndex][tileIndex - 1] + "<";
          } else {
            data[rowIndex][data[0].length - 2] =
              data[rowIndex][data[0].length - 2] + "<t";
          }
        }
        if (
          data[rowIndex][tileIndex].includes("^") &&
          (!data[rowIndex][tileIndex].includes("^t") ||
            data[rowIndex][tileIndex].split("^").length - 1 > 1)
        ) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "^",
            ""
          );
          if (rowIndex > 1) {
            data[rowIndex - 1][tileIndex] = data[rowIndex - 1][tileIndex] + "^";
          } else {
            data[data.length - 2][tileIndex] =
              data[data.length - 2][tileIndex] + "^t";
          }
        }
      });
    });

    for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
      for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
        if (
          data[rowIndex][tileIndex].includes(">") &&
          (!data[rowIndex][tileIndex].includes(">t") ||
            data[rowIndex][tileIndex].split(">").length - 1 > 1)
        ) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            ">",
            ""
          );
          if (tileIndex < data[0].length - 2) {
            data[rowIndex][tileIndex + 1] = data[rowIndex][tileIndex + 1] + ">";
          } else {
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
          if (rowIndex < data.length - 2) {
            data[rowIndex + 1][tileIndex] = data[rowIndex + 1][tileIndex] + "v";
          } else {
            data[1][tileIndex] = data[1][tileIndex] + "vt";
          }
        }
      }
    }

    // Clean up
    for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
      for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
        if (data[rowIndex][tileIndex].includes(">t")) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            ">t",
            ">"
          );
        }
        if (data[rowIndex][tileIndex].includes("vt")) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "vt",
            "v"
          );
        }
        if (data[rowIndex][tileIndex].includes("<t")) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "<t",
            "<"
          );
        }
        if (data[rowIndex][tileIndex].includes("^t")) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "^t",
            "^"
          );
        }
      }
    }
    // if (currMove === 5) debugger;

    for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
      for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
        let nr = parseInt(data[rowIndex][tileIndex]).toString();
        if (nr >= 0) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            nr.toString(),
            "old:[" + nr.toString() + "]"
          );
        }
      }
    }

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      for (let tileIndex = 0; tileIndex < data[0].length; tileIndex++) {
        // if (rowIndex === 1 && tileIndex === 2 && currMove === 5) debugger;
        check(rowIndex - 1, tileIndex, rowIndex, tileIndex, currMove);
        check(rowIndex + 1, tileIndex, rowIndex, tileIndex, currMove);
        check(rowIndex, tileIndex + 1, rowIndex, tileIndex, currMove);
        check(rowIndex, tileIndex - 1, rowIndex, tileIndex, currMove);
        check(rowIndex, tileIndex, rowIndex, tileIndex, currMove);
      }
    }

    for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
      for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
        if (data[rowIndex][tileIndex].includes("old:")) {
          // debugger;
          let nr = data[rowIndex][tileIndex].split("old:")[1].split("]")[0];
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(nr, "");
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "old:]",
            ""
          );
        }
      }
    }

    for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
      for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
        if (data[rowIndex][tileIndex].includes("new:")) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "new:[",
            ""
          );
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            "]",
            ""
          );
        }
      }
    }

    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        let nr = parseInt(data[rowIndex][tileIndex]).toString();
        if (
          nr >= 0 &&
          (data[rowIndex][tileIndex].includes(">") ||
            data[rowIndex][tileIndex].includes("<") ||
            data[rowIndex][tileIndex].includes("^") ||
            data[rowIndex][tileIndex].includes("v"))
        ) {
          data[rowIndex][tileIndex] = data[rowIndex][tileIndex].replace(
            nr.toString(),
            ""
          );
        }
      });
    });
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
      <div
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          marginLeft: "0px",
          marginTop: "24px",
          display: "flex",
        }}
      >
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
      </div>
    </div>
  );
};
