export const recursiveDivision = (grid) => {
  const newGrid = grid.slice();
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      const node = newGrid[i][j];
      if (i === 0 || i === 19) {
        const newNode = { ...node, isWall: true };
        newGrid[i][j] = newNode;
      } else if (
        (i > 0 && i < 19 && j === 0) ||
        (i > 0 && i < 19 && j === 49)
      ) {
        const newNode = { ...node, isWall: true };
        newGrid[i][j] = newNode;
      }
    }
  }
  return newGrid;
};
