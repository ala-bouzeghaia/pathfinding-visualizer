import { NodeType } from "../types/node.type";

export function getRandomMaze(grid: NodeType[][]): NodeType[][] {
  const newGrid = grid.map((row) => {
    return row.map((node) => {
      if (node.isStart || node.isFinish) return node;
      return {
        ...node,
        isWall: Math.random() > 0.8,
      };
    });
  });
  return newGrid;
}
