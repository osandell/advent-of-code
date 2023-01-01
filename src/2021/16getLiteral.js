const getLiteral = (packageContent) => {
  //   content = packageContent.replace(/\b0+/g, "");
  content = packageContent;
  index = 0;
  let foundLastPart = false;
  let literalLength = 0;
  debugger;
  let nrOfParts = 0;
  while (!foundLastPart) {
    if (index === 0) {
      if (content.substring(5 * nrOfParts, 5 * nrOfParts + 1) === "0") {
        foundLastPart = true;
        literalLength += 5;
        nrOfParts++;
      }
    }

    index++;
    if (index === 5) {
      literalLength += 5;
      nrOfParts++;
      index = 0;
    }
  }

  content = content.substring(0, literalLength);

  let value = "";
  for (let i = 0; i < nrOfParts; i++) {
    let part = content.substring(i * 5, 5 + i * 5);
    part = part.substring(1);
    value += part;
  }
  value = parseInt(value, 2);

  return { literal: value, length: literalLength };
};

export default getLiteral;
