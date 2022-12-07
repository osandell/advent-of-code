import React from "react";
import exampleData from "./exampleData";
import exampleDataTest from "./exampleDataTest";
import realData from "./realData";

export default () => {
  const data = exampleData.split("\n");

  let currentPath = "/";
  let dirSizes = {};

  data.forEach((row) => {
    if (row.substring(0, 4) === "$ cd") {
      const targetPath = row.substring(5, row.length);
      if (targetPath === "..") {
        const pathDirs = currentPath.split("/");
        const currentDirNameLength = pathDirs[pathDirs.length - 2].length;

        currentPath = currentPath.substring(
          0,
          currentPath.length - currentDirNameLength - 1
        );
      } else {
        currentPath += row.substring(5, row.length) + "/";
      }
    } else if (parseInt(row.split(" ")[0]) >= 0) {
      const size = parseInt(row.split(" ")[0]);

      currentPath.split("/").forEach((dir) => {
        if (dir.length > 0) {
          if (dirSizes[dir]) {
            dirSizes[dir] += size;
          } else {
            dirSizes[dir] = size;
          }
        }
      });
    }
  });

  let result = 0;

  console.log(
    "\x1b[8m\x1b[40m\x1b[0m\x1b[7m%c    dirSizes    \x1b[8m\x1b[40m\x1b[0m\n",
    "color: white; background: black; font-weight: bold",
    dirSizes
  );

  Object.keys(dirSizes).forEach((key) => {
    if (dirSizes[key] < 100000) {
      result += dirSizes[key];
    }
  });

  return <div>{result}</div>;
};
