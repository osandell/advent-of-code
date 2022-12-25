import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const data = rData.split(/\n/).map((row) => row.split(""));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
  // debugger;

  let result = 0;

  data.forEach((row, rowIndex) => {
    let totalForRow = 0;
    for (let i = 0; i < row.length; i++) {
      let multiplier = Math.pow(5, row.length - i - 1);
      switch (row[i]) {
        case "2":
          totalForRow += 2 * multiplier;
          break;
        case "1":
          totalForRow += 1 * multiplier;
          break;
        case "0":
          totalForRow += 0 * multiplier;
          break;
        case "-":
          totalForRow += -1 * multiplier;
          break;
        case "=":
          totalForRow += -2 * multiplier;
          break;
      }
    }
    result += totalForRow;
  });

  // 4890

  result = 4890;
  let resultArr = result.toString().split("");

  // debugger;

  let newSnafu = ["0"];
  1000000000;

  let getSnafuTest = (nr) => {
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      nr
    );
    let newSnafu = ["0"];
    for (let i = 1; i <= nr; i++) {
      let lastDigit = newSnafu[newSnafu.length - 1];
      switch (lastDigit) {
        case "=":
          newSnafu[newSnafu.length - 1] = "-";
          break;
        case "-":
          newSnafu[newSnafu.length - 1] = "0";
          break;
        case "0":
          newSnafu[newSnafu.length - 1] = "1";
          break;
        case "1":
          newSnafu[newSnafu.length - 1] = "2";
          break;
        case "2":
          let foundNon2 = false;
          for (let i = newSnafu.length - 1; i >= 0; i--) {
            let char = newSnafu[i];
            if (char === "2") {
              newSnafu[i] = "=";
            } else {
              if (!foundNon2) {
                switch (newSnafu[i]) {
                  case "=":
                    newSnafu[i] = "-";
                    break;
                  case "-":
                    newSnafu[i] = "0";
                    break;
                  case "0":
                    newSnafu[i] = "1";
                    break;
                  case "1":
                    newSnafu[i] = "2";
                    break;
                }
                foundNon2 = true;
                break;
              }
            }
          }

          if (!foundNon2) {
            newSnafu.unshift("1");
          }
          break;
      }
    }
    // debugger;
    let test = newSnafu.join("");
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    test    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      test
    );

    return test;
  };

  // getSnafuTest(4800);
  // getSnafuTest(4000);
  // getSnafuTest(800);

  let getSnafu = (nr, index) => {
    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    nr    \x1b[8m\x1b[40m\x1b[0m\n",
      "color: white; background: black; font-weight: bold",
      nr
    );
    let newSnafu = ["0"];
    for (let i = 1; i <= nr; i++) {
      if (i % 1000 === 0) console.log(i);
      // if (i === 39) debugger;
      let lastDigit = newSnafu[newSnafu.length - 1];
      switch (lastDigit) {
        case "=":
          newSnafu[newSnafu.length - 1] = "-";
          break;
        case "-":
          newSnafu[newSnafu.length - 1] = "0";
          break;
        case "0":
          newSnafu[newSnafu.length - 1] = "1";
          break;
        case "1":
          newSnafu[newSnafu.length - 1] = "2";
          break;
        case "2":
          let foundNon2 = false;
          for (let i = newSnafu.length - 1; i >= 0; i--) {
            let char = newSnafu[i];
            if (char === "2") {
              newSnafu[i] = "=";
            } else {
              if (!foundNon2) {
                switch (newSnafu[i]) {
                  case "=":
                    newSnafu[i] = "-";
                    break;
                  case "-":
                    newSnafu[i] = "0";
                    break;
                  case "0":
                    newSnafu[i] = "1";
                    break;
                  case "1":
                    newSnafu[i] = "2";
                    break;
                }
                foundNon2 = true;
                break;
              }
            }
          }

          if (!foundNon2) {
            newSnafu.unshift("1");
          }
          break;
      }
    }
    // debugger;
    let test = newSnafu.join("");

    for (let i = 0; i < index - 1; i++) {
      test += "0";
    }

    return test;
  };

  // debugger;
  let snafuNumbersArr = [];
  for (let i = 0; i < resultArr.length; i++) {
    let test = resultArr[i];
    // for (let j = 0; j < resultArr.length - 1; j++) {
    //   test += "0";
    // }
    // let test2 = parseInt(test);
    // let snafuTest = getSnafu(test2);

    snafuNumbersArr.push(getSnafu(test, resultArr.length - i));
  }

  let snafu = newSnafu.join("");

  // result
  //   .toString()
  //   .split("")
  //   .reverse()
  //   .forEach((char, index) => {
  //     let nr = parseInt(char);

  //     //       1              1
  //     //       2              2
  //     //       3             1=
  //     //       4             1-
  //     //       5             10
  //     //       6             11
  //     //       7             12
  //     //       8             2=
  //     //       9             2-
  //     //      10             20
  //     //      15            1=0
  //     //      20            1-0
  //     //    2022         1=11-2
  //     //   12345        1-0---0
  //     // 314159265  1121-1110-1=0

  //     let multiplier = Math.pow(10, index);
  //     let test = nr * multiplier;
  //     let nrOfFives = test / 5;

  //     let snafu = 0;
  //     switch (char) {
  //       case "0":
  //         snafu = "0";
  //         break;
  //       case "1":
  //         snafu = "1";
  //         break;
  //       case "2":
  //         snafu = "1=";
  //         break;
  //       case "3":
  //         snafu = "1-";
  //         break;
  //       case "4":
  //         snafu = "10";
  //         break;
  //       case "5":
  //         snafu = "11";
  //         break;
  //       case "6":
  //         snafu = "12";
  //         break;
  //       case "7":
  //         snafu = "2=";
  //         break;
  //       case "8":
  //         snafu = "2-";
  //         break;
  //       case "9":
  //         snafu = "20";
  //         break;
  //     }
  //   });

  for (let i = 0; i < moveNr; i++) {
    data.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {});
    });
  }

  let dataToRender = [];
  data.forEach((row) => {
    let newRow = [];
    row.forEach((tile) => {
      newRow.push(tile);
    });

    dataToRender.push(newRow);
  });

  // *********************************************************************************

  return (
    <div>
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
