let values1 = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

let values = values1.split("\n");

console.log(`values`, typeof values);

values = values.map((value) => {
  value = value.split("");
  value = value.map((v) => parseInt(v));
  return value;
});
console.log(`values`, values);

let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
// values.forEach((chunk) => {
//   chunk[0] ? a++ : a--;
//   chunk[1] ? b++ : b--;
//   chunk[2] ? c++ : c--;
//   chunk[3] ? d++ : d--;
//   chunk[4] ? e++ : e--;
// });
let co2Values = values;
// let values = []
for (let index = 0; index < 5; index++) {
  let zeroOrOne = 0;

  values.forEach((chunk) => {
    chunk[index] ? zeroOrOne++ : zeroOrOne--;
  });
  console.log(`zeroOrOne`, zeroOrOne);
  if (zeroOrOne >= 0) {
    values = values.filter((chunk) => {
      return chunk[index] === 1;
    });
  } else {
    values = values.filter((chunk) => {
      return chunk[index] === 0;
    });
  }

  console.log(`oxygen`, values);
}

for (let index = 0; index < 5; index++) {
  let zeroOrOne = 0;

  co2Values.forEach((chunk) => {
    chunk[index] ? zeroOrOne++ : zeroOrOne--;
  });
  console.log(`zeroOrOne`, zeroOrOne);
  if (zeroOrOne >= 0) {
    co2Values = co2Values.filter((chunk) => {
      return chunk[index] === 0;
    });
  } else {
    co2Values = co2Values.filter((chunk) => {
      return chunk[index] === 1;
    });
  }

  console.log(`co2`, co2Values);
}

// console.log(`a`, a, b, c, d, e);

// 10110
