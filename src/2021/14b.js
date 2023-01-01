let firstPair = "PH";
let lastPair = "HN";

let orgString = "PHOSBSKBBBFSPPPCCCHN";

let rules = `KO -> H
OK -> P
BO -> C
SH -> V
PC -> F
NK -> N
PH -> K
VH -> S
NN -> S
VC -> P
OF -> O
HH -> S
VP -> K
KP -> O
NP -> F
SS -> V
HP -> S
PS -> F
BV -> P
KS -> H
SO -> H
NF -> N
CO -> V
HK -> F
OO -> N
KN -> F
SP -> V
OP -> S
OV -> V
HO -> V
PK -> N
FF -> N
CV -> S
PP -> B
CF -> P
HF -> B
BN -> C
FH -> S
ON -> K
SN -> N
CP -> N
OB -> O
HC -> F
KH -> P
OS -> S
NS -> C
BK -> H
PB -> P
SV -> F
FV -> C
BC -> K
HS -> N
PF -> V
NC -> N
CH -> H
VF -> H
KK -> B
OH -> K
HB -> C
SC -> B
VK -> C
FP -> C
SK -> N
VO -> K
FB -> S
KB -> N
BS -> S
VS -> C
CN -> K
KF -> F
NB -> O
BB -> C
CS -> C
FC -> K
NO -> B
SB -> C
CB -> N
BP -> S
NV -> H
NH -> N
PV -> K
PO -> C
VB -> O
FK -> P
HV -> O
KC -> S
VV -> O
VN -> H
BH -> K
FS -> O
KV -> K
HN -> P
OC -> B
SF -> V
CC -> F
CK -> P
FO -> C
PN -> K
BF -> C
FN -> O`;

rules = rules.split("\n");
let pairs = {};
rules.forEach((rule, index) => {
  rule = rule.split(" -> ");

  rules[index] = {
    from: rule[0],
    to: [`${rule[0].charAt(0) + rule[1]}`, `${rule[1] + rule[0].charAt(1)}`],
  };

  pairs[rule[0]] = 0;
});

for (let index = 0; index < orgString.length - 1; index++) {
  let section = `${orgString.charAt(index) + orgString.charAt(index + 1)}`;
  // console.log(`section`, section);

  pairs[section] += 1;
}

// console.log(`rules`, rules);

for (let i = 0; i < 40; i++) {
  let newPairs = { ...pairs };
  let newFirstPair;
  let newLastPair;
  for (let pair in pairs) {
    if (pairs[pair] > 0) {
      console.log(`pair`, pair);
      rules.forEach((rule) => {
        if (pair === rule.from) {
          if (pair === firstPair) {
            console.log(`pair`, pair);
            newFirstPair = rule.to[0];
          }

          if (pair === lastPair) {
            newLastPair = rule.to[1];
          }
          console.log(`rule.from`, rule.from);
          newPairs[rule.to[0]] += pairs[pair];
          newPairs[rule.to[1]] += pairs[pair];
          newPairs[rule.from] -= pairs[pair];
        }
      });
    }
  }
  pairs = { ...newPairs };
  firstPair = newFirstPair;
  lastPair = newLastPair;
}

let firstLetter = firstPair.charAt(0);
let lastLetter = lastPair.charAt(1);

console.log(`pairs`, pairs);
console.log(`firstPair, lastPair`, firstPair, lastPair);
console.log(`firstLetter, lastLetter`, firstLetter, lastLetter);

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

let occurances = {};

alphabet.forEach((letter) => {
  occurances[letter] = 0;
});

alphabet.forEach((letter) => {
  for (let pair in pairs) {
    if (pairs[pair] > 0) {
      if (pair.includes(letter)) {
        console.log(`letter`, letter);
        console.log(`pair`, pair);
        console.log(`pairs[pair]`, pairs[pair]);
        occurances[letter] += pairs[pair];
        console.log(`occurances[letter]`, occurances[letter]);

        console.log(
          `pair.charAt[0], pair.charAt[1]`,
          pair.charAt(0),
          pair.charAt(1)
        );

        if (letter === pair.charAt(0) && letter === pair.charAt(1)) {
          console.log("YYYYYYYYYYYYYYYYYYYYYY", letter);
          occurances[letter] += pairs[pair];
        }
      }
    }
  }

  if ((letter === firstLetter) | (letter === lastLetter)) {
    occurances[letter] += 1;
  }
});

for (let letter in occurances) {
  // console.log("------------------------", letter);
  // console.log(`letter, occurances`, letter, occurances);
  occurances[letter] = occurances[letter] / 2;
}

for (let letter in occurances) {
  if (occurances[letter] > highest) {
    highest = occurances[letter];
  }

  if (occurances[letter] < lowest && occurances[letter] !== 0) {
    lowest = occurances[letter];
  }
}

console.log(`occurances`, occurances);
console.log(`highest, lowest`, highest, lowest);
console.log(`highest - lowest`, highest - lowest);

/*
Template:     NNCB
After step 1: NCNBCHB
After step 2: NBCCNBBBCBHCB
After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
*/
