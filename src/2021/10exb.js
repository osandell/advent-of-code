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

lines = lines.split("\n");

lines.forEach((line, index) => {
  lines[index] = line.split("");
});

let uncorruptedLines = [];

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
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === "]") {
        if (!(characterArray[characterArray.length - 1] === "[")) {
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === "}") {
        if (!(characterArray[characterArray.length - 1] === "{")) {
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      } else if (character === ">") {
        if (!(characterArray[characterArray.length - 1] === "<")) {
          corruptedCharacterArray.push(character);
          foundCorruption = true;
        } else {
          characterArray.pop();
        }
      }
    }
  });
  if (!foundCorruption) {
    uncorruptedLines.push(line);
  }
});

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

lines = uncorruptedLines;

// console.log(`uncorruptedLines`, lines);

let scores = [];

lines.forEach((line, lineIndex) => {
  characterArray = [];
  line.forEach((character, characterIndex) => {
    if (
      (character === "(") |
      (character === "[") |
      (character === "{") |
      (character === "<")
    ) {
      characterArray.push(character);
    } else if (character === ")") {
      if (!(characterArray[characterArray.length - 1] === "(")) {
        corruptedCharacterArray.push(character);
        foundCorruption = true;
        console.log("found corr");
      } else {
        characterArray.pop();
      }
    } else if (character === "]") {
      if (!(characterArray[characterArray.length - 1] === "[")) {
        corruptedCharacterArray.push(character);
        foundCorruption = true;
        console.log("found corr");
      } else {
        characterArray.pop();
      }
    } else if (character === "}") {
      if (!(characterArray[characterArray.length - 1] === "{")) {
        corruptedCharacterArray.push(character);
        foundCorruption = true;
        console.log("found corr");
      } else {
        characterArray.pop();
      }
    } else if (character === ">") {
      if (!(characterArray[characterArray.length - 1] === "<")) {
        corruptedCharacterArray.push(character);
        foundCorruption = true;
        console.log("found corr");
      } else {
        characterArray.pop();
      }
    }
  });
  console.log(`characterArray`, characterArray);

  let score = 0;
  characterArray = characterArray.reverse();
  characterArray.forEach((character, index) => {
    let charValue;
    if (character === "(") charValue = 1;
    if (character === "[") charValue = 2;
    if (character === "{") charValue = 3;
    if (character === "<") charValue = 4;
    score *= 5;
    score += charValue;
  });

  scores.push(score);
});

console.log(`scores`, scores);

let pos = scores.length / 2;
pos = pos - 0.5;

scores = scores.sort(function (a, b) {
  return a - b;
});

console.log(`pos`, pos);

console.log(`scores[scores.length/2]`, scores[pos]);