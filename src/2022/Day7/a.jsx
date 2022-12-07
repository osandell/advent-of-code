import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

export default () => {
  let currentPath = "/root/";
  let dirSizes = {};

  realData.split("\n").forEach((row) => {
    if (row.substring(0, 4) === "$ cd") {
      const targetPath = row.substring(5, row.length);
      if (targetPath === "..") {
        const pathDirs = currentPath.split("/");
        currentPath = pathDirs.slice(0, pathDirs.length - 1).join("/");
      } else {
        // Gotcha!! Make sure to invent a unique dir name since the data
        // contains multiple dirs with same name. We do so by simply adding the
        // preceding path (without /:s) to each new dir name.
        currentPath +=
          currentPath.replaceAll("/", "") + row.substring(5, row.length) + "/";
      }
    } else if (parseInt(row.split(" ")[0]) >= 0) {
      const size = parseInt(row.split(" ")[0]);

      currentPath.split("/").forEach((dir) => {
        dirSizes[dir] ? (dirSizes[dir] += size) : (dirSizes[dir] = size);
      });
    }
  });

  const result = Object.keys(dirSizes).reduce((acc, key) => {
    return dirSizes[key] < 100000 ? acc + dirSizes[key] : acc;
  }, 0);

  return <div>{result}</div>;
};
