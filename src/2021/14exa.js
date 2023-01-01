let orgString = "NNCB";

let rules = `CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

rules = rules.split("\n");

let newString = "";
for (let i = 0; i < 10; i++) {
  for (let index = 0; index < orgString.length - 1; index++) {
    let section = `${orgString.charAt(index) + orgString.charAt(index + 1)}`;
    console.log(`section`, section);

    rules.forEach((rule) => {
      rule = rule.split(" -> ");

      if (rule[0] === section) {
        if (index === 0) {
          newString += `${rule[0].charAt(0) + rule[1] + rule[0].charAt(1)}`;
        } else {
          newString += `${rule[1] + rule[0].charAt(1)}`;
        }
      }
    });
  }
  orgString = newString;
  newString = "";
}

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let highest = 0;
let lowest = 9999999999999999999;

alphabet.forEach((letter) => {
  var regex = new RegExp(letter, "g");
  let occurances = (orgString.match(regex) || []).length;

  if (occurances > highest) {
    highest = occurances;
  }

  if (occurances < lowest && occurances !== 0) {
    lowest = occurances;
  }
});
console.log(`highest`, highest);
console.log(`lowest`, lowest);

console.log(`highest - lowest`, highest - lowest);
// console.log(`orgString`, orgString);

//NCNBCHB
