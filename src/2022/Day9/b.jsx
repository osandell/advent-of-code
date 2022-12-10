import React, { useState } from "react";
import eData from "./exampleData";
import eDataB from "./exampleDataB";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

const data = eDataB.split(/\n/).map((row) =>
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

const generateLine = (y, rope, tailVisitedPos) => {
  let line = [];
  for (let x = -MAP_SIZE; x <= MAP_SIZE; x++) {
    let tailVisitedThisTile = false;
    Object.keys(tailVisitedPos).forEach((key) => {
      const tailX = parseInt(key.split(",")[0]);
      const tailY = parseInt(key.split(",")[1]);

      if (x === tailX && y === tailY) {
        tailVisitedThisTile = true;
      }
    });

    let partOfRopeOnThisTile;
    for (let j = ROPE_LENGTH - 1; j >= 0; j--) {
      if (x === rope[j][0] && y === rope[j][1]) {
        partOfRopeOnThisTile = j;
      }
    }
    if (partOfRopeOnThisTile === 0) {
      line.push("H");
    } else if (partOfRopeOnThisTile) {
      line.push(partOfRopeOnThisTile.toString());
    } else if (y === 0 && x === 0) {
      line.push("s");
    } else if (tailVisitedThisTile) {
      line.push("¨");
    } else {
      line.push("");
    }
  }
  return line;
};

const generateDataToRender = (rope, tailVisitedPos) => {
  let map = [];
  for (let y = -MAP_SIZE; y <= MAP_SIZE; y++) {
    map.push(generateLine(y, rope, tailVisitedPos));
  }
  return map;
};

const moveHead = (moveType, rope) => {
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

const moveRestOfRope = (rope) => {
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
  let tailVisitedPos = {};
  let rope = [];
  for (let i = 0; i < ROPE_LENGTH; i++) {
    rope.push([0, 0]);
  }

  let currMove = 0;

  let totalNrOfMoves = 0;
  for (let i = 0; i < data.length; i++) {
    const move = data[i];
    const nrOfMovesInCurrentDirection = move[1];
    for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
      totalNrOfMoves++;
    }
  }

  const [moveNr, setMoveNr] = useState(0);
  const moveNrRef = React.useRef(moveNr);
  moveNrRef.current = moveNr;

  for (let i = 0; i < data.length; i++) {
    if (currMove === moveNr) {
      break;
    }

    const move = data[i];
    const moveType = move[0];
    const nrOfMovesInCurrentDirection = move[1];
    for (let i = 0; i < nrOfMovesInCurrentDirection; i++) {
      if (currMove === moveNr) {
        break;
      }

      moveHead(moveType, rope);
      moveRestOfRope(rope);

      tailVisitedPos[rope[ROPE_LENGTH - 1].toString()] = true;

      currMove++;
    }
  }

  const result = Object.keys(tailVisitedPos).length;

  const dataToRender = generateDataToRender(rope, tailVisitedPos);

  const startPlaying = () => {
    if (moveNr < totalNrOfMoves) {
      const timer = setInterval(() => {
        moveNrRef.current < totalNrOfMoves
          ? setMoveNr(moveNrRef.current + 1)
          : clearInterval(timer);
      }, 30);
    }
  };

  // 2487
  return (
    <div>
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={""}
        shouldRenderBinarily={false}
        shouldInvertX={false}
        shouldInvertY={true}
        sizeX={"11px"}
        sizeY={"15px"}
        isCenterOrigin={true}
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
    </div>
  );
};
