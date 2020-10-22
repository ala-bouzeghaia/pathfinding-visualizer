export const randomMaze = (grid) => {
  const newGrid = grid.slice();
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      const node = newGrid[i][j];
      if (Math.random() > 0.8 && !node.isStart && !node.isFinish) {
        const newNode = { ...node, isWall: !node.isWall };
        newGrid[i][j] = newNode;
      }
    }
  }
  return newGrid;
};
