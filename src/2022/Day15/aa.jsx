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

    // for (let i = 0; i <= distance; i++) {
    //   for (let j = 0; j <= distance; j++) {
    //     if (!drawnTile[sensor.sx.toString() + ":" + sensor.sy.toString()]) {
    //       drawnTile[sensor.sx.toString() + ":" + sensor.sy.toString()] = true;
    //     }

    //     if (!drawnTile[sensor.bx.toString() + ":" + sensor.by.toString()]) {
    //       drawnTile[sensor.bx.toString() + ":" + sensor.by.toString()] = true;
    //     }

    //     if (
    //       !drawnTile[
    //         (sensor.sx + i - j).toString() + ":" + (sensor.sy + j).toString()
    //       ] &&
    //       i - j >= 0
    //     ) {
    //       drawnTile[
    //         (sensor.sx + i - j).toString() + ":" + (sensor.sy + j).toString()
    //       ] = true;
    //       if (pointsByRow[sensor.sy + j]) {
    //         pointsByRow[sensor.sy + j]++;
    //       } else {
    //         pointsByRow[sensor.sy + j] = 1;
    //       }
    //     }
    //     if (
    //       !drawnTile[
    //         (sensor.sx - i + j).toString() + ":" + (sensor.sy + j).toString()
    //       ] &&
    //       i - j >= 0
    //     ) {
    //       drawnTile[(sensor.sx - i + j).toString() + ":" + (sensor.sy + j)] = true;
    //       if (pointsByRow[sensor.sy + j]) {
    //         pointsByRow[sensor.sy + j]++;
    //       } else {
    //         pointsByRow[sensor.sy + j] = 1;
    //       }
    //     }
    //     if (
    //       !drawnTile[
    //         (sensor.sx + i - j).toString() + ":" + (sensor.sy - j).toString()
    //       ] &&
    //       i - j >= 0
    //     ) {
    //       drawnTile[(sensor.sx + i - j).toString() + ":" + (sensor.sy - j)] = true;
    //       if (pointsByRow[sensor.sy - j]) {
    //         pointsByRow[sensor.sy - j]++;
    //       } else {
    //         pointsByRow[sensor.sy - j] = 1;
    //       }
    //     }
    //     if (
    //       !drawnTile[
    //         (sensor.sx - i + j).toString() + ":" + (sensor.sy - j).toString()
    //       ] &&
    //       i - j >= 0
    //     ) {
    //       drawnTile[(sensor.sx - i + j).toString() + ":" + (sensor.sy - j)] = true;
    //       if (pointsByRow[sensor.sy - j]) {
    //         pointsByRow[sensor.sy - j]++;
    //       } else {
    //         pointsByRow[sensor.sy - j] = 1;
    //       }
    //     }
    //   }
    // }
  });

  // sensorSpans.forEach((sensorSpan) => {
  //   let sensorsInThisSpan = [];
  //   sensors.forEach((sensor, index) => {
  //     if (sensor.top[1] >= sensorSpan[0] && sensor.bottom[1] <= sensorSpan[1]) {
  //       sensorsInThisSpan.push(index);
  //     }
  //   });

  // });

  const getXSpanForSensosRow = (sensor, rowNr) => {
    let sensorY = sensor.sy;
    let distance = sensorY - rowNr;

    if (distance > 0) {
      return [sensor.left[0] + distance, sensor.right[0] - distance];
    } else {
      return [sensor.left[0] - distance, sensor.right[0] + distance];
    }
  };

  sensors.forEach((sensor, sensorIndex) => {
    let sensorY = sensor.sy;

    let spansForThisSensor = [[sensor.left[0], sensor.right[0]]];

    sensors.forEach((sensor2, sensor2Index) => {
      // Not same and not already processed
      if (sensorIndex !== sensor2Index && sensor2Index > sensorIndex) {
        // Sensor 1 Y is within the Y span of sensor 2
        if (sensorY > sensor2.top[1] && sensorY < sensor2.bottom[1]) {
          // Get the span of sensor 2 for this particular row
          let sensor2XSpanForThisRow = getXSpanForSensosRow(sensor2, sensorY);
          spansForThisSensor.push(sensor2XSpanForThisRow);
        }
      }
    });

    let uniqueSpansForThisSensor = [];

    spansForThisSensor.forEach((span, index) => {
      if (index === 0) {
        uniqueSpansForThisSensor = [[...span]];
      } else {
        let isEncompassing = -1;
        let isOverlappingLeft = -1;
        let isOverlappingRight = -1;
        let isOutside = -1;
        let isInside = -1;
        uniqueSpansForThisSensor.forEach((uniqueSpan, uniqueSpanIndex) => {
          if (span[0] < uniqueSpan[0] && span[1] > uniqueSpan[1]) {
            isEncompassing = uniqueSpanIndex;
            // If the new span encompasses the unique span, replace the unique span
          } else if (span[0] >= uniqueSpan[0] && span[1] <= uniqueSpan[1]) {
            // If the new span is inside the unique span, do nothing
            isInside = uniqueSpanIndex;
          } else if (
            span[0] < uniqueSpan[0] &&
            span[1] <= uniqueSpan[1] &&
            span[1] >= uniqueSpan[0]
          ) {
            // If the new spans left boundary is to the left of the unique spans
            // left boundary, and the new spans right boundary is to the left of
            // the unique spans right boundary, adjust the unique span
            isOverlappingLeft = uniqueSpanIndex;
          } else if (
            span[0] >= uniqueSpan[0] &&
            span[1] > uniqueSpan[1] &&
            span[0] <= uniqueSpan[1]
          ) {
            // If the new spans left boundary is to the right of the unique spans
            // left boundary, and the new spans right boundary is to the right of
            // the unique spans right boundary, adjust the unique span
            isOverlappingRight = uniqueSpanIndex;
          } else {
            // If the new span is outside the unique span, add it to the list

            isOutside = uniqueSpanIndex;
          }
        });

        if (isInside > -1) {
        } else if (isEncompassing > -1) {
          uniqueSpansForThisSensor[isEncompassing] = span;
        } else if (isOverlappingLeft > -1) {
          uniqueSpansForThisSensor[isOverlappingLeft][0] = span[0];
        } else if (isOverlappingRight > -1) {
          uniqueSpansForThisSensor[isOverlappingRight][1] = span[1];
        } else if (isOutside > -1) {
          uniqueSpansForThisSensor.push(span);
        }
      }
    });

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        uniqueSpansForThisSensor    \x1b[8m\x1b[40m\x1b[0m%c aa.jsx 197 \n",
      "color: white; background: black; font-weight: bold",
      "",
      uniqueSpansForThisSensor
    );

    let totalSpanLength = 0;
    uniqueSpansForThisSensor.forEach((span) => {
      let spanLength = span[1] - span[0];
      totalSpanLength += Math.abs(spanLength);
    });

    console.log(
      "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c        totalSpanLengths    \x1b[8m\x1b[40m\x1b[0m%c aa.jsx 266 \n",
      "color: white; background: black; font-weight: bold",
      "",
      totalSpanLength
    );

    if (totalSpanLength > highest) {
      highest = totalSpanLength;
      highestSensor = sensorY;
    }
  });

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c      highestSensor    \x1b[8m\x1b[40m\x1b[0m%c aa.jsx 266 \n",
    "color: white; background: black; font-weight: bold",
    "",
    highestSensor
  );

  // *********************************************************************************

  return <div> {highest}</div>;
};
