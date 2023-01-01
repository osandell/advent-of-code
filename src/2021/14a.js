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
