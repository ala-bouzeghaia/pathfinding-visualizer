export const recursiveDivision = (grid) => {
  const newGrid = grid.slice();
  const wall = Math.floor(Math.random() * 18 + 1);
  const hole = Math.floor(Math.random() * 48 + 1);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      //addContours(newGrid, i, j);
      addWall(newGrid, i, j, wall, hole);
      //const node = newGrid[i][j];

      /* if (i === wall && j !== hole) {
        const newNode = { ...node, isWall: true };
        newGrid[i][j] = newNode;
      } */
      /* if (j !== hole) {
        const newNode = { ...node, isWall: true };
        newGrid[wall][j] = newNode;
      } */
    }
  }
  return newGrid;
};

const addContours = (newGrid, row, col) => {
  const node = newGrid[row][col];
  if (row === 0 || row === 19) {
    const newNode = { ...node, isWall: true };
    newGrid[row][col] = newNode;
  } else if (
    (row > 0 && row < 19 && col === 0) ||
    (row > 0 && row < 19 && col === 49)
  ) {
    const newNode = { ...node, isWall: true };
    newGrid[row][col] = newNode;
  }
};

const addWall = (gridWithWall, row, col, wall, hole) => {
  const node = gridWithWall[row][col];
  //const wall = Math.floor(Math.random() * 18 + 1);
  //const hole = Math.floor(Math.random() * 48 + 1);
  /* const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  //const FINISH_NODE_ROW = 10;
  const FINISH_NODE_COL = 35; */
  /* if (wall === 10) {
    if (col !== 15 && col !== 35) {
      //grid[wall][col].isWall = true;
      const newNode = { ...node, isWall: true };
      gridWithWall[wall][col] = newNode;
    }
  } else */
  if (row === wall && col !== hole) {
    const newNode = { ...node, isWall: true };
    gridWithWall[row][col] = newNode;
  }
};
