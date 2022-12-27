import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import fiftyData from "./fifty";
import Render from "../../Render";

let quickestNrOfMoves = 99999999;

export default () => {
  let data = rData.split(/\n/).map((row) => row.split(""));
  // let data = JSON.parse(fiftyData);

  let moves = [{ position: [0, 1], data: data }];

  const totalNrOfMoves = 99999999999999999999999999;

  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // *********************************************************************************
  // const [moveNr, setMoveNr] = useState(7005625); mer än 10 min tror jag, men går.. högsta typ 145
  const [moveNr, setMoveNr] = useState(0);
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

  let lowestTo40 = 999999999;
  let highestX = 0;
  let result = 0;
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

  let currNrOfMoves = 0;
  let currPlayerMove = 0;

  let isBusted = false;
  let isPlayerMove = false;
  let bustedMoves = [];
  let highestPosX = 0;
  let dataToRender = [];

  let maps = [];

  let nrOfMovesToFinish = 400;
  for (let currMove = 0; currMove < nrOfMovesToFinish; currMove++) {
    // if (currMove === 127) debugger;

    currData = [];
    data.forEach((row) => {
      currData.push([...row]);
    });
    maps.push(currData);

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
            data[rowIndex][tileIndex - 1] = data[rowIndex][tileIndex - 1] + "<";
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
            data[rowIndex - 1][tileIndex] = data[rowIndex - 1][tileIndex] + "^";
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
            data[rowIndex][tileIndex + 1] = data[rowIndex][tileIndex + 1] + ">";
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
            data[rowIndex + 1][tileIndex] = data[rowIndex + 1][tileIndex] + "v";
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
  }

  // debugger;
  // maps = maps.reverse();

  data = maps[0];

  let nrOfMovesMap = [];
  data.forEach((row, rowIndex) => {
    let newRow = [];
    row.forEach((tile, tileIndex) => {
      if (rowIndex === 0 && tileIndex === 1) {
        newRow.push("0");
      } else {
        newRow.push("");
      }
    });
    nrOfMovesMap.push(newRow);
  });

  let drewOnesLastTime = true;

  const check = (y, x, rowIndex, tileIndex, i) => {
    // if we are net to End and we are in an empty tile...
    if (
      nrOfMovesMap[y] &&
      nrOfMovesMap[y][x] &&
      parseInt(nrOfMovesMap[y][x]) === i - 1 &&
      !data[rowIndex][tileIndex].includes("<") &&
      !data[rowIndex][tileIndex].includes(">") &&
      !data[rowIndex][tileIndex].includes("^") &&
      !data[rowIndex][tileIndex].includes("v") &&
      !data[rowIndex][tileIndex].includes("#")
    ) {
      nrOfMovesMap[rowIndex][tileIndex] = i.toString();
      // debugger;

      // nrOfMovesMap[rowIndex][tileIndex] = (
      //   parseInt(nrOfMovesMap[y][x]) + 1
      // ).toString();
    }
  };

  let mapIndex = 0;
  let playerMove = false;
  data = maps[mapIndex];
  mapIndex++;
  let playerMoveNr = 1;
  for (let i = 0; i < moveNr; i++) {
    // for (let i = 0; i < nrOfMovesToFinish * 2 - 2; i++) {
    // if (moveNr === 5) debugger;
    if (playerMove) {
      data = maps[mapIndex];

      for (let rowIndex = data.length - 1; rowIndex >= 0; rowIndex--) {
        for (let tileIndex = data[0].length - 1; tileIndex >= 0; tileIndex--) {
          // if (rowIndex === 0 && tileIndex === 1 && playerMoveNr === 0) {
          //   debugger;
          // }
          check(rowIndex - 1, tileIndex, rowIndex, tileIndex, playerMoveNr);
          check(rowIndex + 1, tileIndex, rowIndex, tileIndex, playerMoveNr);
          check(rowIndex, tileIndex - 1, rowIndex, tileIndex, playerMoveNr);
          check(rowIndex, tileIndex + 1, rowIndex, tileIndex, playerMoveNr);
          check(rowIndex, tileIndex, rowIndex, tileIndex, playerMoveNr);
        }
      }

      // clean away busted moves
      data.forEach((row, rowIndex) => {
        row.forEach((tile, tileIndex) => {
          if (
            nrOfMovesMap[rowIndex][tileIndex] !== "" &&
            (data[rowIndex][tileIndex].includes(">") ||
              data[rowIndex][tileIndex].includes("<") ||
              data[rowIndex][tileIndex].includes("^") ||
              data[rowIndex][tileIndex].includes("v"))
          ) {
            nrOfMovesMap[rowIndex][tileIndex] = "";
          }
        });
      });
      playerMove = false;
      mapIndex++;

      if (drewOnesLastTime) {
        drewOnesLastTime = false;
      } else {
        drewOnesLastTime = true;
      }

      playerMoveNr++;
    } else {
      data = maps[mapIndex];

      playerMove = true;
    }
  }

  let foundTopLeft = false;
  dataToRender = [];
  data.forEach((row, rowIndex) => {
    let newRow = [];
    row.forEach((tile, tileIndex) => {
      if (
        nrOfMovesMap[rowIndex][tileIndex] !== "" &&
        nrOfMovesMap[rowIndex][tileIndex] !== undefined
      ) {
        tile = foundTopLeft
          ? tile + nrOfMovesMap[rowIndex][tileIndex]
          : tile + nrOfMovesMap[rowIndex][tileIndex] + "";
        foundTopLeft = true;
      }
      newRow.push(tile);
    });
    dataToRender.push(newRow);
  });

  if (dataToRender[data.length - 1][data[0].length - 2] !== "") {
    // debugger;
    if (playerMoveNr < quickestNrOfMoves) {
      quickestNrOfMoves = playerMoveNr - 1;
    }
  }

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      quickestNrOfMoves    \x1b[8m\x1b[40m\x1b[0m%c c.jsx 297 \n",
    "color: white; background: black; font-weight: bold",
    "",
    quickestNrOfMoves
  );

  // *********************************************************************************

  return (
    <div style={{ width: "100%" }}>
      <Render
        dataToRender={dataToRender}
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
        <div style={{ marginTop: "24px" }}>
          0: {moves[moves.length - 1].position[0]}
        </div>
        <div style={{ marginTop: "24px" }}>
          1: {moves[moves.length - 1].position[1]}
        </div>
        <div style={{ marginTop: "24px" }}>currPlayerMove: {moves.length}</div>
        <div style={{ marginTop: "24px" }}>highest pos x: {highestPosX}</div>
        <div style={{ marginTop: "24px" }}>lowest to 40: {lowestTo40}</div>
      </div>
    </div>
  );
};
