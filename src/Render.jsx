import React from "react";

const renderMapLine = (
  y,
  lineToRenderData,
  shouldInvertX,
  emptyTileIndicator,
  sizeX,
  sizeY,
  shouldRenderBinarily,
  isIndexRow = false
) => {
  let line = [];
  for (let x = 0; x < lineToRenderData.length; x++) {
    const invertedX = lineToRenderData.length - x - 1;
    const tileNr = shouldInvertX ? invertedX : x;

    const key = tileNr.toString() + ":" + y.toString();
    const styling = {
      display: "flex",
      width: sizeX,
      minWidth: sizeX,
      height: sizeY,
      fontSize: isIndexRow ? "8px" : "10px",
      lineHeight: "10px",
      color: "black",
      background: isIndexRow ? "transparent" : "beige",
      margin: "1px",
      justifyContent: "center",
      alignItems: "center",
      border: isIndexRow ? "1px solid gray" : "1px solid transparent",
      marginBottom: isIndexRow ? "8px" : "1px",
    };

    line.push(
      <div
        style={{
          ...styling,
          background:
            shouldRenderBinarily &&
            lineToRenderData[tileNr] !== emptyTileIndicator
              ? "black"
              : isIndexRow
              ? "transparent"
              : "beige",
        }}
        key={key}
      >
        {!shouldRenderBinarily && lineToRenderData[tileNr]}
      </div>
    );
  }
  return line;
};

const render = ({
  dataToRender = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
    ["9", "10", "11", "12"],
  ],
  shouldInvertX = false,
  shouldInvertY = false,
  shouldRenderBinarily = false,
  sizeX = "15px",
  sizeY = "15px",
  emptyTileIndicator = false,
  isCenterOrigin = false,
}) => {
  if (typeof dataToRender === "number") {
    dataToRender = [dataToRender.toString()];
  }

  if (typeof dataToRender === "string") {
    dataToRender = [dataToRender];
  }

  const styling = {
    display: "flex",
    fontSize: "10px",
    lineHeight: "10px",
    color: "gray",
  };

  const indexStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeX,
    marginRight: "10px",
    border: "1px solid gray",
  };
  let map = [];

  const xIndexRow = [];
  for (let x = 0; x < dataToRender[0].length; x++) {
    const nr = isCenterOrigin ? x - (dataToRender[0].length - 1) / 2 : x;
    xIndexRow.push((nr - 2).toString());
  }
  map.push(
    <div key={"-1"} style={styling}>
      <div style={{ ...indexStyling, border: "1px solid transparent" }}> </div>
      {renderMapLine(
        -1,
        xIndexRow,
        shouldInvertX,
        emptyTileIndicator,
        sizeX,
        sizeY,
        false,
        true
      )}
    </div>
  );

  for (let y = 0; y < dataToRender.length; y++) {
    const invertedY = dataToRender.length - y - 1;
    const lineNr = shouldInvertY ? invertedY : y;
    const lineNrToRender = isCenterOrigin
      ? lineNr - (dataToRender.length - 1) / 2
      : lineNr;

    map.push(
      <div key={lineNr.toString()} style={styling}>
        <div style={indexStyling}> {lineNrToRender.toString()} </div>
        {renderMapLine(
          lineNr,
          dataToRender[lineNr],
          shouldInvertX,
          emptyTileIndicator,
          sizeX,
          sizeY,
          shouldRenderBinarily
        )}
      </div>
    );
  }
  return map;
};

export default render;
