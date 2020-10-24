export const recursiveDivision = (grid) => {
  const newGrid = grid.slice();
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      const node = newGrid[i][j];
      if (i === 0 || i === 20) {
        const newNode = { ...node, isWall: true };
        newGrid[i][j] = newNode;
      } else if (i > 0 && i < 20 && (j === 0 || j === 50)) {
        const newNode = { ...node, isWall: true };
        newGrid[i][j] = newNode;
      }
    }
  }
  return newGrid;
};
