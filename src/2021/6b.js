// let allFish = [3, 4, 3, 1, 2];

// for (let i = 0; i < 256; i++) {
//   allFish.forEach((fish, index) => {
//     if (fish === 0) {
//       allFish.push(8);
//       allFish[index] = 6;
//     } else {
//       allFish[index] = --fish;
//     }
//   });

//   //   console.log(`allFish`, allFish);
// }
// console.log(`allFish.length`, allFish.length);

let input = [
  2, 3, 1, 3, 4, 4, 1, 5, 2, 3, 1, 1, 4, 5, 5, 3, 5, 5, 4, 1, 2, 1, 1, 1, 1, 1,
  1, 4, 1, 1, 1, 4, 1, 3, 1, 4, 1, 1, 4, 1, 3, 4, 5, 1, 1, 5, 3, 4, 3, 4, 1, 5,
  1, 3, 1, 1, 1, 3, 5, 3, 2, 3, 1, 5, 2, 2, 1, 1, 4, 1, 1, 2, 2, 2, 2, 3, 2, 1,
  2, 5, 4, 1, 1, 1, 5, 5, 3, 1, 3, 2, 2, 2, 5, 1, 5, 2, 4, 1, 1, 3, 3, 5, 2, 3,
  1, 2, 1, 5, 1, 4, 3, 5, 2, 1, 5, 3, 4, 4, 5, 3, 1, 2, 4, 3, 4, 1, 3, 1, 1, 2,
  5, 4, 3, 5, 3, 2, 1, 4, 1, 4, 4, 2, 3, 1, 1, 2, 1, 1, 3, 3, 3, 1, 1, 2, 2, 1,
  1, 1, 5, 1, 5, 1, 4, 5, 1, 5, 2, 4, 3, 1, 1, 3, 2, 2, 1, 4, 3, 1, 1, 1, 3, 3,
  3, 4, 5, 2, 3, 3, 1, 3, 1, 4, 1, 1, 1, 2, 5, 1, 4, 1, 2, 4, 5, 4, 1, 5, 1, 5,
  5, 1, 5, 5, 2, 5, 5, 1, 4, 5, 1, 1, 3, 2, 5, 5, 5, 4, 3, 2, 5, 4, 1, 1, 2, 4,
  4, 1, 1, 1, 3, 2, 1, 1, 2, 1, 2, 2, 3, 4, 5, 4, 1, 4, 5, 1, 1, 5, 5, 1, 4, 1,
  4, 4, 1, 5, 3, 1, 4, 3, 5, 3, 1, 3, 1, 4, 2, 4, 5, 1, 4, 1, 2, 4, 1, 2, 5, 1,
  1, 5, 1, 1, 3, 1, 1, 2, 3, 4, 2, 4, 3, 1,
];

let allFish = {
  temp: 0,
  n0: 0,
  n1: 0,
  n2: 0,
  n3: 0,
  n4: 0,
  n5: 0,
  n6: 0,
  n7: 0,
  n8: 0,
};

input.forEach((number) => {
  number === 1 && allFish.n1++;
  number === 2 && allFish.n2++;
  number === 3 && allFish.n3++;
  number === 4 && allFish.n4++;
  number === 5 && allFish.n5++;
  number === 6 && allFish.n6++;
  number === 7 && allFish.n7++;
  number === 8 && allFish.n8++;
});

console.log(`allFish`, allFish);

// 80 - 358214

for (let i = 0; i < 256; i++) {
  allFish.temp = allFish.n0;
  allFish.n0 = allFish.n1;
  allFish.n1 = allFish.n2;
  allFish.n2 = allFish.n3;
  allFish.n3 = allFish.n4;
  allFish.n4 = allFish.n5;
  allFish.n5 = allFish.n6;
  allFish.n6 = allFish.n7;
  allFish.n7 = allFish.n8;
  allFish.n6 = allFish.n6 + allFish.temp;
  allFish.n8 = allFish.temp;

  // console.log("day: ", i + 1);
  // console.log(`allFish`, allFish);
}

console.log(
  `sum`,
  allFish.n0 +
    allFish.n1 +
    allFish.n2 +
    allFish.n3 +
    allFish.n4 +
    allFish.n5 +
    allFish.n6 +
    allFish.n7 +
    allFish.n8
);
