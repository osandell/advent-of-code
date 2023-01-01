let connections = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

connections = connections.split("\n");

connections = connections.map((connection) => {
  connection = connection.split("-");
  return { node1: connection[0], node2: connection[1] };
});

let currentPath = ["start"];
let visitedSmallCaves = [];
let twiceVisitedSmallCaves = [];

const move = (node) => {
  currentPath.push(node);
  if (node !== "start" && node !== "end" && node == node.toLowerCase()) {
    if (visitedSmallCaves.includes(node)) {
      twiceVisitedSmallCaves.push(node);
    } else {
      visitedSmallCaves.push(node);
    }
  }
};

let paths = [];
let foundAllPaths = false;
let counter = 0;
while (currentPath.length > 0) {
  let didMove = connections.some((connection) => {
    if (
      (connection.node1 === currentPath[currentPath.length - 1]) |
      (connection.node2 === currentPath[currentPath.length - 1])
    ) {
      const destinationNode =
        connection.node1 === currentPath[currentPath.length - 1]
          ? connection.node2
          : connection.node1;

      let destinationPathString = "";
      currentPath.forEach((position, index) => {
        if (index === currentPath.length - 1) {
          destinationPathString += position;
        } else {
          destinationPathString += position + ",";
        }
      });
      destinationPathString += "," + destinationNode;

      if (
        !(destinationNode === "start") &&
        !twiceVisitedSmallCaves.includes(destinationNode) &&
        !(twiceVisitedSmallCaves.length > 1) &&
        !paths.includes(destinationPathString)
      ) {
        move(destinationNode);
        if (currentPath[currentPath.length - 1] === "end") {
          let currentPathString = "";
          currentPath.forEach((position, index) => {
            if (index === currentPath.length - 1) {
              currentPathString += position;
            } else {
              currentPathString += position + ",";
            }
          });
          paths.push(currentPathString);

          currentPath.pop();
        }
        return true;
      }
    }
  });
  if (!didMove) {
    let currentPathString = "";
    currentPath.forEach((position, index) => {
      if (index === currentPath.length - 1) {
        currentPathString += position;
      } else {
        currentPathString += position + ",";
      }
    });
    paths.push(currentPathString);
    if (
      twiceVisitedSmallCaves[twiceVisitedSmallCaves.length - 1] ===
      currentPath[currentPath.length - 1]
    ) {
      twiceVisitedSmallCaves.pop();
    } else if (
      visitedSmallCaves[visitedSmallCaves.length - 1] ===
      currentPath[currentPath.length - 1]
    ) {
      visitedSmallCaves.pop();
    }
    currentPath.pop();
  }

  counter++;
}

paths = paths.filter((path) => path.includes("end"));
console.log(`paths`, paths);
console.log(`paths.length`, paths.length);
