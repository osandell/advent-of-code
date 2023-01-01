map = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// 2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678

map = map.split("\n");

map.forEach((row, index) => {
  map[index] = row.split("");
  map[index].forEach((digit, index2) => {
    map[index][index2] = parseInt(digit);
  });
});

let allMarkedPositions = [];
let foundAllBasins = false;
let round = 0;
let sizes = [];

while (!foundAllBasins) {
  round++;

  let foundAllCoordsOfBasin = false;
  let foundFirstCoordOfBasin = false;
  let markedPositions = [];

  foundAllBasins = true;

  while (!foundAllCoordsOfBasin) {
    foundAllCoordsOfBasin = true;

    map.forEach((row, rowIndex) => {
      row.forEach((position, columnIndex) => {
        if (position !== 9) {
          if (!foundFirstCoordOfBasin) {
            if (!allMarkedPositions.includes(`${rowIndex}-${columnIndex}`)) {
              markedPositions.push(`${rowIndex}-${columnIndex}`);
              allMarkedPositions.push(`${rowIndex}-${columnIndex}`);
              foundFirstCoordOfBasin = true;
              foundAllCoordsOfBasin = false;
              foundAllBasins = false;
            }
          }

          if (columnIndex !== 0) {
            const coordToLeft = `${rowIndex}-${columnIndex - 1}`;
            if (markedPositions.includes(coordToLeft)) {
              if (!markedPositions.includes(`${rowIndex}-${columnIndex}`)) {
                foundAllCoordsOfBasin = false;
                markedPositions.push(`${rowIndex}-${columnIndex}`);
                allMarkedPositions.push(`${rowIndex}-${columnIndex}`);
                foundAllBasins = false;
              }
            }
          }

          if (columnIndex !== row.length - 1) {
            const coordToRight = `${rowIndex}-${columnIndex + 1}`;
            if (markedPositions.includes(coordToRight)) {
              if (!markedPositions.includes(`${rowIndex}-${columnIndex}`)) {
                foundAllCoordsOfBasin = false;
                markedPositions.push(`${rowIndex}-${columnIndex}`);
                allMarkedPositions.push(`${rowIndex}-${columnIndex}`);
                foundAllBasins = false;
              }
            }
          }

          if (rowIndex !== 0) {
            const coordAbove = `${rowIndex - 1}-${columnIndex}`;
            if (markedPositions.includes(coordAbove)) {
              if (!markedPositions.includes(`${rowIndex}-${columnIndex}`)) {
                foundAllCoordsOfBasin = false;
                markedPositions.push(`${rowIndex}-${columnIndex}`);
                allMarkedPositions.push(`${rowIndex}-${columnIndex}`);
                foundAllBasins = false;
              }
            }
          }

          if (rowIndex !== map.length - 1) {
            const coordBelow = `${rowIndex + 1}-${columnIndex}`;
            if (markedPositions.includes(coordBelow)) {
              if (!markedPositions.includes(`${rowIndex}-${columnIndex}`)) {
                foundAllCoordsOfBasin = false;
                markedPositions.push(`${rowIndex}-${columnIndex}`);
                allMarkedPositions.push(`${rowIndex}-${columnIndex}`);
                foundAllBasins = false;
              }
            }
          }
        }
      });
    });
  }

  !foundAllBasins && sizes.push(markedPositions.length);
}

console.log(`sizes`, sizes);
const sortedSizes = sizes.sort(function (a, b) {
  return a - b;
});

console.log(`sortedSizes`, sortedSizes);

const sum =
  sortedSizes[sortedSizes.length - 1] *
  sortedSizes[sortedSizes.length - 2] *
  sortedSizes[sortedSizes.length - 3];

console.log(`sum`, sum);
