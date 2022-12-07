import React from "react";
import exampleData from "./exampleData";
import exampleDataTest from "./exampleDataTest";
import realData from "./realData";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default () => {
  const data = realData.split("\n");

  let currentPath = "/";
  let dirSizes = {};
  let tree = {};

  const getDirSize = (dir, name) => {
    let size = 0;

    Object.keys(dir).forEach((key) => {
      if (dir[key].size) {
        size += parseInt(dir[key].size);
      } else {
        size += getDirSize(dir[key], key);
      }
    });

    if (dirSizes[name]) {
    }

    dirSizes[makeid(40)] = size;

    return size;
  };

  Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  };

  var someObject = {
    part1: {
      name: "Part 1erw",
      size: "20",
      qty: "50",
    },
    part2: {
      name: "Part 2",
      size: "15",
      qty: "60",
    },
    part3: [
      {
        name: "Part 3A",
        size: "10",
        qty: "20",
      },
      {
        name: "Part 3B",
        size: "5",
        qty: "20",
      },
      {
        name: "Part 3C",
        size: "7.5",
        qty: "20",
      },
    ],
  };

  let nrOfDirs = 0;

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
    } else if (row.substring(0, 4) === "dir ") {
      nrOfDirs++;
      const currentPathWithDots = currentPath
        .replaceAll("/", ".")
        .slice(1, currentPath.length - 1);

      if (currentPathWithDots.length > 0) {
        Object.byString(tree, currentPathWithDots)[row.split(" ")[1]] = {};
      } else {
        tree[row.split(" ")[1]] = {};
      }
    } else if (parseInt(row.split(" ")[0]) >= 0) {
      const currentPathWithDots = currentPath
        .replaceAll("/", ".")
        .slice(1, currentPath.length - 1);

      if (currentPathWithDots.length > 0) {
        Object.byString(tree, currentPathWithDots)[row.split(" ")[1]] = {
          type: "file",
          size: row.split(" ")[0],
        };
      } else {
        tree[row.split(" ")[1]] = { type: "file", size: row.split(" ")[0] };
      }
    }
  });

  Object.keys(tree).forEach((key) => {
    // if no size it must be a dir
    if (!tree[key].size) {
      if (dirSizes[key]) {
      }
      dirSizes[key] = getDirSize(tree[key], key);
    }
  });

  let result = 0;

  Object.keys(dirSizes).forEach((key) => {
    if (dirSizes[key] <= 100000) {
      result += dirSizes[key];
    }
  });

  // Object.byString(tree, "a")["yoyoyo"] = "yyyyyy";

  return <div>{result}</div>;
};
