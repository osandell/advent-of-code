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

let allFish = {
  temp: 0,
  n0: 0,
  n1: 1,
  n2: 1,
  n3: 2,
  n4: 1,
  n5: 0,
  n6: 0,
  n7: 0,
  n8: 0,
};

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
