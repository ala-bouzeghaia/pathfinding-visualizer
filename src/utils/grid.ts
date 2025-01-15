import { NodeType } from "../types/node.type";
import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
} from "./const";

function createNode(row: number, col: number): NodeType {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

export function getInitialGrid(numRows: number, numCols: number): NodeType[][] {
  const grid = [];
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
}

export function resetGrid(grid: NodeType[][]): NodeType[][] {
  return grid.map((row) => row.map((node) => ({ ...node, isWall: false })));
}
