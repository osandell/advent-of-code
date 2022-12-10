import React from "react";
import eData from "./exampleData";
import rData from "./realData";
import Render from "../../Render";

export default () => {
  const data2 = `noop
  addx 3
  addx -5`;
  const data = rData.split("\n");

  let cycle = 0;
  let x = 1;
  let result = 0;
  const dataToRender = ["", "", "", "", "", ""];

  const draw = (cycle, x) => {
    for (let i = 0; i < dataToRender.length; i++) {
      if (cycle >= i * 40 && cycle < (i + 1) * 40) {
        const spriteMiddlePosition = x + i * 40;
        const spritePositions = [
          spriteMiddlePosition - 1,
          spriteMiddlePosition,
          spriteMiddlePosition + 1,
        ];
        let shouldDrawSprite = false;
        spritePositions.forEach((spritePosition) => {
          if (spritePosition === cycle) {
            shouldDrawSprite = true;
          }
        });
        if (shouldDrawSprite) {
          dataToRender[i] += "x";
        } else {
          dataToRender[i] += "_";
        }
      }
    }
  };

  data.forEach((line) => {
    if (line === "noop") {
      draw(cycle, x);
      cycle++;
    } else {
      const nrToAdd = parseInt(line.split(" ")[1]);

      for (let i = 0; i < 2; i++) {
        draw(cycle, x);
        cycle++;

        if (i === 1) {
          x += nrToAdd;
        }
      }
    }
  });

  // PZGPKPEB
  return (
    <div>
      <Render
        dataToRender={dataToRender}
        emptyTileIndicator={"_"}
        shouldRenderBinarily={true}
        shouldInvertX={false}
        shouldInvertY={false}
        sizeX={"11px"}
        sizeY={"15px"}
        isCenterOrigin={false}
      />
    </div>
  );
};
