let connections = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

connections = connections.split("\n");

connections = connections.map((connection) => {
  connection = connection.split("-");
  return { node1: connection[0], node2: connection[1] };
});

let currentPath = ["start"];
let visitedSmallCaves = [];

const move = (node) => {
  currentPath.push(node);
  if (node !== "start" && node !== "end" && node == node.toLowerCase()) {
    visitedSmallCaves.push(node);
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
        !visitedSmallCaves.includes(destinationNode) &&
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
      visitedSmallCaves[visitedSmallCaves.length - 1] ===
      currentPath[currentPath.length - 1]
    ) {
      visitedSmallCaves.pop();
    }
    currentPath.pop();
    console.log(`reached dead end`);
  }

  counter++;
}

paths = paths.filter((path) => path.includes("end"));
console.log(`paths`, paths);
