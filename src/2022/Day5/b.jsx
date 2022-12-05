import React from "react";
import exampleData from "./exampleData";
import realData from "./realData";

let exampleStacks = [["Z", "N"], ["M", "C", "D"], ["P"]];
let stacks = [
  ["N", "C", "R", "T", "M", "Z", "P"],
  ["D", "N", "T", "S", "B", "Z"],
  ["M", "H", "Q", "R", "F", "C", "T", "G"],
  ["G", "R", "Z"],
  ["Z", "N", "R", "H"],
  ["F", "H", "S", "W", "P", "Z", "L", "D"],
  ["W", "D", "Z", "R", "C", "G", "M"],
  ["S", "J", "F", "L", "H", "W", "Z", "Q"],
  ["S", "Q", "P", "W", "N"],
];

export default () => {
  const data = realData.split(/\n/).map((row) => {
    const quantity = row.split(" ")[1];
    const from = row.split(" ")[3];
    const to = row.split(" ")[5];

    return { quantity, from, to };
  });

  data.forEach((movement) => {
    const crates = stacks[movement.from - 1].splice(-movement.quantity);
    crates.forEach((crate) => {
      stacks[movement.to - 1].push(crate);
    });
  });

  const result = stacks.map((stack) => stack[stack.length - 1]).join("");

  return <div>{result}</div>;
};
