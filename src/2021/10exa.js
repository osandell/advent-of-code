lines = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

console.log(`lines`, lines);

lines = lines.split("\n");

lines.forEach((line, index) => {
  lines[index] = line.split("");
});

console.log(`lines`, lines);

let characterArray = [];
let corruptedCharacterArray = [];
lines.forEach((line, lineIndex) => {
  let foundCorruption = false;
  line.forEach((character, characterIndex) => {
    if (!foundCorruption) {
      if (
        (character === "(") |
        (character === "[") |
        (character === "{") |
        (character === "<")
      ) {
        characterArray.push(character);
      } else if (character === ")") {
        if (!(characterArray[characterArray.length - 1] === "(")) {
          console.log("problem", lineIndex, characterIndex, character);
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === "]") {
        if (!(characterArray[characterArray.length - 1] === "[")) {
          console.log("problem", lineIndex, characterIndex, character);
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === "}") {
        if (!(characterArray[characterArray.length - 1] === "{")) {
          console.log("problem", lineIndex, characterIndex, character);
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === ">") {
        if (!(characterArray[characterArray.length - 1] === "<")) {
          console.log("problem", lineIndex, characterIndex, character);
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      }
    }
  });
});
console.log(`corruptedCharacterArray`, corruptedCharacterArray);

let points = 0;
corruptedCharacterArray.forEach((character) => {
  if (character == ")") {
    points += 3;
  }
  if (character == "]") {
    points += 57;
  }
  if (character == "}") {
    points += 1197;
  }
  if (character == ">") {
    points += 25137;
  }
});

console.log(`points`, points);
