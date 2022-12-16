import React, { useState } from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

const MAP_SIZE = 30;
const ROPE_LENGTH = 10;

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const sensors = rData.split(/\n/).map((sensor) => {
  let test = sensor.split("=");
  return {
    sx: parseInt(test[1].split(",")[0]),
    sy: parseInt(test[2].split(":")[0]),
    bx: parseInt(test[3].split(",")[0]),
    by: parseInt(test[4]),
  };
});
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
  // for (let i = 0; i < sensors.length; i++) {
  //   const move = sensors[i];
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

  let highest = 0;
  let highestSensor = 0;
  let drawnTile = {};
  let pointsByRow = {};
  let sensorSpans = [];

  sensors.forEach((sensor, sensorIndex) => {
    let distance =
      Math.abs(sensor.sx - sensor.bx) + Math.abs(sensor.sy - sensor.by);
    sensors[sensorIndex].top = [sensor.sx, sensor.sy - distance];
    sensors[sensorIndex].bottom = [sensor.sx, sensor.sy + distance];
    sensors[sensorIndex].left = [sensor.sx - distance, sensor.sy];
    sensors[sensorIndex].right = [sensor.sx + distance, sensor.sy];

    sensorSpans.push([sensor.sy - distance, sensor.sy + distance]);
  });

  const getXSpanForSensorRow = (sensor, rowNr) => {
    let sensorY = sensor.sy;
    let distance = sensorY - rowNr;

    if (distance > 0) {
      return [sensor.left[0] + distance, sensor.right[0] - distance];
    } else {
      return [sensor.left[0] - distance, sensor.right[0] + distance];
    }
  };

  const iterationStart = 0;
  const iterationFinish = 4000000;

  for (let rowNr = iterationStart; rowNr <= iterationFinish; rowNr++) {
    let spansForThisRowNr = [];

    sensors.forEach((sensor, sensor2Index) => {
      // Row is within the Y span of sensor
      if (rowNr >= sensor.top[1] && rowNr <= sensor.bottom[1]) {
        // Get the span of sensor for this particular row
        let sensorXSpanForThisRow = getXSpanForSensorRow(sensor, rowNr);
        spansForThisRowNr.push(sensorXSpanForThisRow);
      }
    });

    let lastDigit = -99999999999999;
    spansForThisRowNr.forEach((span, spanIndex) => {
      let potentialNr;
      spansForThisRowNr.forEach((spannn) => {
        if (spannn[0] - 2 === lastDigit) {
          potentialNr = spannn[0] - 1;
        }
      });

      if (potentialNr) {
        // console.log(
        //   "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      yo    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 115 \n",
        //   "color: white; background: black; font-weight: bold",
        //   "",
        //   potentialNr,
        //   spansForThisRowNr,
        //   (span[0] - 1) * 4000000 + rowNr
        // );

        let foundIt = true;

        spansForThisRowNr.forEach((span2) => {
          if (potentialNr >= span2[0] && potentialNr <= span2[1]) {
            foundIt = false;
          }
        });

        if (foundIt) {
          console.log(
            "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c              found it    \x1b[8m\x1b[40m\x1b[0m%c b.jsx 126 \n",
            "color: white; background: black; font-weight: bold",
            "",
            potentialNr * 4000000 + rowNr
          );
        }
      }
      lastDigit = span[1];
    });
  }

  7652362337769;

  // *********************************************************************************

  return <div> {highest}</div>;
};
