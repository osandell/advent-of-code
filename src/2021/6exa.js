let allFish = [3, 4, 3, 1, 2];

for (let i = 0; i < 256; i++) {
  allFish.forEach((fish, index) => {
    if (fish === 0) {
      allFish.push(8);
      allFish[index] = 6;
    } else {
      allFish[index] = --fish;
    }
  });

  //   console.log(`allFish`, allFish);
}
console.log(`allFish.length`, allFish.length);
