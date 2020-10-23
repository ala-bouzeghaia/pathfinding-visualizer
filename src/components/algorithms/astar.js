export const astar = (grid, startNode, finishNode) => {
  let openSet = [];
  let closedSet = [];
  let path = [];
  startNode.distance = 0;

  openSet.push(startNode);

  while (openSet.length > 0) {
    let winner = sortNodesbyfscore(openSet, finishNode);
    let current = openSet[winner];

    // did it find the end node?
    if (current === finishNode) {
      return path;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = getUnvisitedNeighbors(current, grid);
    for (let neighbor of neighbors) {
      // Already seen?
      if (!closedSet.includes(neighbor)) {
        //tempG is the distance from strat to neighbor through current
        let tempG = current.distance + heuristic(neighbor, current);
        //let newPath = false;
        if (tempG < neighbor.distance) {
          neighbor.previousNode = current;
          neighbor.distance = tempG;
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    let temp = current;
    path.push(temp);
    while (temp.previousNode) {
      path.push(temp.previousNode);
      temp = temp.previousNode;
    }
    /* for (let node of path) {
            if (node.type !== "start") node.type ="path";
        }*/
  }

  /* for (let i = path.length - 1; i >= 0; i--) {
        if (path[i].type !== "start") path[i].type ="found";
        this.setState({ grid });
        await this.sleep(10); 
    }*/

  return path;
};

const sortNodesbyfscore = (nodes, finishNode) => {
  let winner = 0;
  for (let i = 0; i < nodes.length; i++) {
    if (
      nodes[i].distance + heuristic(nodes[i], finishNode) <
      nodes[winner].distance + heuristic(nodes[winner], finishNode)
    ) {
      winner = i;
    }
  }
  return winner;
};

const heuristic = (nodeA, nodeB) => {
  return Math.abs(nodeB.col - nodeA.col) + Math.abs(nodeB.row - nodeA.row);
};

const removeFromArray = (arr, elt) => {
  for (let i = arr.length; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
};

const reconstructPath = () => {
  let path = [];
};
