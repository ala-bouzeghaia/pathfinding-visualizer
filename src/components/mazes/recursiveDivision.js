export const recursiveDivision = (grid) => {
  const newGrid = grid.slice();
  const addEntrance = () => {
    let x = randomNumber(1, newGrid[0].length - 1);

    return x;
  };

  const addInnerWalls = (h, minX, maxX, minY, maxY, gate) => {
    if (h) {
      if (maxX - minX < 2) {
        return;
      }

      let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
      //console.log("y", y);
      addHWall(newGrid, minX, maxX, y);

      addInnerWalls(!h, minX, maxX, minY, y - 1, gate);
      addInnerWalls(!h, minX, maxX, y + 1, maxY, gate);
    } else {
      if (maxY - minY < 2) {
        return;
      }

      let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
      //console.log("x", x);
      addVWall(newGrid, minY, maxY, x);

      addInnerWalls(!h, minX, x - 1, minY, maxY, gate);
      addInnerWalls(!h, x + 1, maxX, minY, maxY, gate);
    }
  };

  const addHWall = (Grid, minX, maxX, y) => {
    let hole = randomNumber(minX, maxX);
    for (let i = minX; i < maxX; i++) {
      const node = Grid[y][i];
      if (!node.isStart && !node.isFinish && i !== hole) {
        //Grid[y][i].isWall = true;
        const newNode = { ...node, isWall: true };
        Grid[y][i] = newNode;
      }
    }
  };

  const addVWall = (Grid, minY, maxY, x) => {
    let hole = randomNumber(minY, maxY);
    for (let i = minY; i <= maxY; i++) {
      const node = Grid[i][x];
      if (!node.isStart && !node.isFinish && i !== hole) {
        //Grid[i][x].isWall = true;
        const newNode = { ...node, isWall: true };
        Grid[i][x] = newNode;
      }
    }
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let ent = addEntrance();
  addInnerWalls(false, 0, newGrid[0].length - 1, 0, newGrid.length - 1, ent);
  //console.log("newGrid", newGrid);
  return newGrid;
};

/* const addContours = (newGrid, row, col) => {
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
}; */
