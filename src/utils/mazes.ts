import type { NodeType } from "../types/node.type";

/**
 * Generates a random maze by converting some nodes into walls.
 * Start and finish nodes are preserved and cannot become walls.
 *
 * @param grid - The original 2D grid of nodes
 * @returns A new 2D grid with randomly placed walls
 *
 * @example
 * const originalGrid = [[{ isWall: false, isStart: true }, { isWall: false, isFinish: false }]];
 * const mazeGrid = getRandomMaze(originalGrid);
 */
export function getRandomMaze(grid: NodeType[][]): NodeType[][] {
  const resetGrid = grid.map((row) =>
    row.map((node) => ({
      ...node,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }))
  );
  const newGrid = resetGrid.map((row) => {
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

/**
 * Creates a maze using the recursive division algorithm
 * @param grid The grid to create the maze in
 * @returns A new grid with walls placed according to the recursive division algorithm
 */
export function getRecursiveDivisionMaze(grid: NodeType[][]): NodeType[][] {
  const newGrid = grid.map((row) =>
    row.map((node) => ({
      ...node,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }))
  );
  const height = grid.length;
  const width = grid[0].length;

  // Add border walls
  for (let i = 0; i < height; i++) {
    if (!newGrid[i][0].isStart && !newGrid[i][0].isFinish)
      newGrid[i][0].isWall = true;
    if (!newGrid[i][width - 1].isStart && !newGrid[i][width - 1].isFinish)
      newGrid[i][width - 1].isWall = true;
  }
  for (let j = 0; j < width; j++) {
    if (!newGrid[0][j].isStart && !newGrid[0][j].isFinish)
      newGrid[0][j].isWall = true;
    if (!newGrid[height - 1][j].isStart && !newGrid[height - 1][j].isFinish)
      newGrid[height - 1][j].isWall = true;
  }

  divideMaze(newGrid, 1, height - 2, 1, width - 2);
  return newGrid;
}

/**
 * Recursively divides the grid into chambers using walls to create a maze
 * Uses the recursive division algorithm: divides space into two parts and adds a wall with one passage
 * @param grid The grid to create the maze in
 * @param startRow Starting row of the current section
 * @param endRow Ending row of the current section
 * @param startCol Starting column of the current section
 * @param endCol Ending column of the current section
 */
function divideMaze(
  grid: NodeType[][],
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number
) {
  // Base case: if section is invalid, return
  if (endRow < startRow || endCol < startCol) return;

  const height = endRow - startRow + 1;
  const width = endCol - startCol + 1;

  // If section is taller than wide, divide horizontally
  if (height > width) {
    // Choose a row in the middle to place wall
    const row = Math.floor(startRow + height / 2);
    // Create multiple holes (2-3 holes)
    const numHoles = Math.floor(Math.random() * 2) + 2; // Random number between 2 and 3
    const holes = [];

    for (let i = 0; i < numHoles; i++) {
      const hole = Math.floor(startCol + Math.random() * width);
      holes.push(hole);
    }

    // Place wall along the row, except at the holes
    for (let j = startCol; j <= endCol; j++) {
      if (
        !holes.includes(j) &&
        !grid[row][j].isStart &&
        !grid[row][j].isFinish
      ) {
        grid[row][j].isWall = true;
      }
    }

    // // Create a random passage through the wall
    // const hole = Math.floor(startCol + Math.random() * width);

    // // Place wall along the row, except at the hole
    // for (let j = startCol; j <= endCol; j++) {
    //   if (j !== hole && !grid[row][j].isStart && !grid[row][j].isFinish) {
    //     grid[row][j].isWall = true;
    //   }
    // }

    // Recursively divide the top and bottom sections
    divideMaze(grid, startRow, row - 1, startCol, endCol);
    divideMaze(grid, row + 1, endRow, startCol, endCol);
  } else {
    // If section is wider than tall, divide vertically
    const col = Math.floor(startCol + width / 2);
    // Create multiple holes (2-3 holes)
    const numHoles = Math.floor(Math.random() * 2) + 2; // Random number between 2 and 3
    const holes = [];

    for (let i = 0; i < numHoles; i++) {
      const hole = Math.floor(startRow + Math.random() * height);
      holes.push(hole);
    }

    // Place wall along the column, except at the holes
    for (let i = startRow; i <= endRow; i++) {
      if (
        !holes.includes(i) &&
        !grid[i][col].isStart &&
        !grid[i][col].isFinish
      ) {
        grid[i][col].isWall = true;
      }
    }

    // // Place wall along the column, except at the hole
    // for (let i = startRow; i <= endRow; i++) {
    //   if (i !== hole && !grid[i][col].isStart && !grid[i][col].isFinish) {
    //     grid[i][col].isWall = true;
    //   }
    // }

    // Recursively divide the left and right sections
    divideMaze(grid, startRow, endRow, startCol, col - 1);
    divideMaze(grid, startRow, endRow, col + 1, endCol);
  }
}
