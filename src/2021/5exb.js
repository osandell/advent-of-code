let input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

input = input.split("\n");
input.forEach((element, index) => {
  input[index] = element.split("->");

  //   console.log(`input[index]`, input[index]);
  input[index].forEach((coord, coordIndex) => {
    input[index][coordIndex] = {
      x: parseInt(coord.split(",")[0]),
      y: parseInt(coord.split(",")[1]),
    };
  });
});

// console.log(`input`, input);

let coords = [];

let intersections = {};
input.forEach((line) => {
  if (line[0].x > line[1].x && line[0].y === line[1].y) {
    for (let i = line[1].x; i <= line[0].x; i++) {
      let coordString = "" + i + "," + line[0].y;

      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
  } else if (line[0].x < line[1].x && line[0].y === line[1].y) {
    for (let i = line[0].x; i <= line[1].x; i++) {
      let coordString = "" + i + "," + line[0].y;
      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
  } else if (line[0].y > line[1].y && line[0].x === line[1].x) {
    for (let i = line[1].y; i <= line[0].y; i++) {
      let coordString = "" + line[0].x + "," + i;
      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
  } else if (line[0].y < line[1].y && line[0].x === line[1].x) {
    for (let i = line[0].y; i <= line[1].y; i++) {
      let coordString = "" + line[0].x + "," + i;
      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
    // diag top left bottom right
  } else if (line[0].x < line[1].x && line[0].y < line[1].y) {
    let j = line[0].y;
    console.log("top left bot right");
    console.log(`line[0].x, line[0].y`, line[0].x, line[0].y);

    console.log(`line[1].x, line[1].y`, line[1].x, line[1].y);
    for (let i = line[0].x; i <= line[1].x; i++) {
      let coordString = "" + i + "," + j;
      console.log(`i, j`, i, j);
      j++;

      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
    // bottom left top right
  } else if (line[0].x < line[1].x && line[0].y > line[1].y) {
    let j = line[0].y;
    console.log("bott left top right");
    console.log(`line[0].x, line[0].y`, line[0].x, line[0].y);
    console.log(`line[1].x, line[1].y`, line[1].x, line[1].y);
    for (let i = line[0].x; i <= line[1].x; i++) {
      let coordString = "" + i + "," + j;

      console.log(`i,j`, i, j);
      j--;
      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
    // bottom right top left
  } else if (line[0].x > line[1].x && line[0].y > line[1].y) {
    let j = line[0].y;
    console.log("bot right top left");
    console.log(`line[0].x, line[0].y`, line[0].x, line[0].y);
    console.log(`line[1].x, line[1].y`, line[1].x, line[1].y);
    for (let i = line[0].x; i >= line[1].x; i--) {
      let coordString = "" + i + "," + j;
      console.log(`i, j`, i, j);
      j--;

      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
    //top right bottom left
  } else if (line[0].x > line[1].x && line[0].y < line[1].y) {
    let j = line[0].y;
    console.log("top right bot left");
    console.log(`line[0].x, line[0].y`, line[0].x, line[0].y);
    console.log(`line[1].x, line[1].y`, line[1].x, line[1].y);
    for (let i = line[0].x; i >= line[1].x; i--) {
      let coordString = "" + i + "," + j;

      console.log(`i, j`, i, j);

      j++;

      if (coords.length > 0 && coords.includes(coordString)) {
        intersections[coordString] = true;
      }
      coords.push(coordString);
    }
  }
});

console.log(`coords`, coords);
console.log(`intersections`, intersections);

console.log(
  `Object.keys.intersections.length`,
  Object.keys(intersections).length
);

console.log(`coords.length`, coords.length);
