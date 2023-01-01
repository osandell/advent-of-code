let rows = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0`;

let highestX = 0;
let highestY = 0;

rows = rows.split("\n");

rows.forEach((row, index) => {
  rows[index] = {
    x: parseInt(row.split(",")[0]),
    y: parseInt(row.split(",")[1]),
  };

  if (rows[index].x > highestX) {
    highestX = rows[index].x;
  }

  if (rows[index].y > highestY) {
    highestY = rows[index].y;
  }
});
console.log(`highestX, highestY`, highestX, highestY);

console.log(`rows`, rows);

const nrOfRows = highestY + 1;
const nrOfColumns = highestX + 1;

const printPaper = (rows) => {
  for (let y = 0; y < nrOfRows; y++) {
    let rowToLog = "";
    for (let x = 0; x < nrOfColumns; x++) {
      let foundADot;
      rows.forEach((row) => {
        if (row.x === x && row.y === y) {
          foundADot = true;
        }
      });

      if (foundADot) {
        rowToLog += "#";
      } else {
        rowToLog += ".";
      }
    }
    console.log(rowToLog);
  }
};

let foldInstructions = `fold along y=7
fold along x=5`;

foldInstructions = foldInstructions.split("\n");

foldInstructions.forEach((instruction, index) => {
  foldInstructions[index] = instruction.substring(11, instruction.length);
});

console.log(`foldInstructions`, foldInstructions);

// printPaper(rows);

foldInstructions.forEach((instruction) => {
  if (instruction.includes("x")) {
    console.log("x");
    instruction = parseInt(instruction.substring(2, instruction.length));

    rows.forEach((row, index) => {
      if (row.x > instruction) {
        rows[index].x = nrOfColumns - rows[index].x - 1;
      }
    });
  } else if (instruction.includes("y")) {
    console.log("y");
    instruction = parseInt(instruction.substring(2, instruction.length));

    rows.forEach((row, index) => {
      if (row.y > instruction) {
        rows[index].y = nrOfRows - rows[index].y - 1;
      }
    });
  }
  printPaper(rows);
});

let dots = {};
rows.forEach((row) => {
  let coordString = `${row.x}-${row.y}`;
  dots[coordString] = true;
});

console.log(`dots`, dots);
console.log(`Object.keys(dots).length;`, Object.keys(dots).length);
