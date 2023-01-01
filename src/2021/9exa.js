map = `2199943210
3987894921
9856789892
8767896789
9899965678`;

map = map.split("\n");

map.forEach((row, index) => {
  map[index] = row.split("");
  map[index].forEach((digit, index2) => {
    map[index][index2] = parseInt(digit);
  });
});
let sum = 0;
map.forEach((row, rowIndex) => {
  row.forEach((position, posIndex) => {
    let lowPoint = false;
    if (rowIndex > 0) {
      if (position < map[rowIndex - 1][posIndex]) {
        lowPoint = true;
      }
    }
    if (rowIndex < map.length - 1) {
      if (position > map[rowIndex + 1][posIndex]) {
        lowPoint = true;
      }
    }
    if (posIndex > 0) {
      if (position > map[rowIndex][posIndex - 1]) {
        lowPoint = true;
      }
    }
    if (rowIndex < row.length - 1) {
      if (position > map[rowIndex][posIndex + 1]) {
        lowPoint = true;
      }
    }

    if (lowPoint) sum += position + 1;
  });
});

console.log(`sum`, sum);
