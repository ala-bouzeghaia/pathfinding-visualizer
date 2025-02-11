import { NodeType } from "../types/node.type";

/**
 * Implements Dijkstra's algorithm for finding the shortest path in a graph
 * @param startNode The node to start from
 * @param endNode The node to end at
 * @param nodes The 2D array of nodes
 * @returns A 2D array of nodes with the shortest path marked as visited
 */
export function dijkstra(
  startNode: NodeType,
  endNode: NodeType,
  nodes: NodeType[][]
): NodeType[] {
  // const unvisitedNodes = nodes.flat();
  const unvisitedNodes = nodes.flat().filter((node) => !node.isWall);
  const visitedNodesInOrder: NodeType[] = [];
  startNode.distance = 0;

  while (unvisitedNodes.length > 0) {
    const closestNode = unvisitedNodes.reduce((acc, curr) =>
      curr.distance < acc.distance ? curr : acc
    );

    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    unvisitedNodes.splice(unvisitedNodes.indexOf(closestNode), 1);

    if (closestNode === endNode) break;

    const neighbors = getNeighbors(closestNode, nodes);
    neighbors.forEach((neighbor) => {
      const tentativeDistance = closestNode.distance + 1;
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.previousNode = closestNode;
      }
    });
  }

  return visitedNodesInOrder;
}

/**
 * Gets all unvisited neighbors of a given node
 * @param node The node to get neighbors for
 * @param nodes The 2D array of nodes
 * @returns An array of unvisited neighbors
 */
function getNeighbors(node: NodeType, nodes: NodeType[][]): NodeType[] {
  const neighbors = [];
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      if (row === 0 && col === 0) continue;
      if (Math.abs(row) + Math.abs(col) > 1) continue;
      const newRow = node.row + row;
      const newCol = node.col + col;
      if (
        newRow >= 0 &&
        newRow < nodes.length &&
        newCol >= 0 &&
        newCol < nodes[0].length &&
        !nodes[newRow][newCol].isVisited &&
        !nodes[newRow][newCol].isWall
      ) {
        neighbors.push(nodes[newRow][newCol]);
      }
    }
  }
  return neighbors;
}

// Backtracks from the finishNode to find the shortest path.
export function getShortestPath(finishNode: NodeType): NodeType[] {
  const nodesInShortestPathOrder = [];
  let currentNode: NodeType | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

/**
 * Implements the A* algorithm for finding the shortest path in a graph.
 * Uses a heuristic to prioritize exploring nodes that are likely closer to the target.
 *
 * @param startNode The starting node for the pathfinding algorithm.
 * @param endNode The target node to reach.
 * @param nodes The 2D array of nodes representing the graph.
 * @returns An array of nodes in the order they were visited.
 */
export function aStar(
  startNode: NodeType,
  endNode: NodeType,
  nodes: NodeType[][]
): NodeType[] {
  const openSet = [startNode];
  const visitedNodesInOrder: NodeType[] = [];
  startNode.distance = 0;

  while (openSet.length > 0) {
    const current = openSet.reduce((acc, curr) =>
      curr.distance + heuristic(curr, endNode) <
      acc.distance + heuristic(acc, endNode)
        ? curr
        : acc
    );

    openSet.splice(openSet.indexOf(current), 1);
    current.isVisited = true;
    visitedNodesInOrder.push(current);

    if (current === endNode) break;

    const neighbors = getNeighbors(current, nodes);
    for (const neighbor of neighbors) {
      const tentativeGScore = current.distance + 1;

      if (tentativeGScore < neighbor.distance) {
        neighbor.previousNode = current;
        neighbor.distance = tentativeGScore;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return visitedNodesInOrder;
}

function heuristic(nodeA: NodeType, nodeB: NodeType): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

/**
 * Implements Breadth-First Search algorithm for pathfinding
 * @param startNode The starting node
 * @param endNode The target node
 * @param nodes The 2D array of nodes
 * @returns Array of nodes in order of visitation
 */
export function bfs(
  startNode: NodeType,
  endNode: NodeType,
  nodes: NodeType[][]
): NodeType[] {
  const queue = [startNode];
  const visitedNodesInOrder: NodeType[] = [];
  startNode.isVisited = true;
  startNode.distance = 0;

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) break;

    const neighbors = getNeighbors(currentNode, nodes);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        neighbor.distance = currentNode.distance + 1;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
