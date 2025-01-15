import { useEffect, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Grid } from "./components/Grid";
import { NodeType } from "./types/node.type";

import { NUMBER_OF_COLS, NUMBER_OF_ROWS, SQUARE_SIZE } from "./utils/const";
import { getInitialGrid, resetGrid } from "./utils/grid";
import { getRandomMaze } from "./utils/maze";

export function App() {
  const [algo, setAlgo] = useState("");
  console.log(algo);
  const gridRef = useRef<HTMLDivElement>(null);

  const [gridSize, setGridSize] = useState({
    rows: NUMBER_OF_ROWS,
    cols: NUMBER_OF_COLS,
  });
  const { rows: numRows, cols: numCols } = gridSize;

  const initialGrid = getInitialGrid(numRows, numCols);
  const [grid, setGrid] = useState<NodeType[][]>(initialGrid);

  function handleResize() {
    if (gridRef.current) {
      setGridSize({
        rows: Math.floor(gridRef?.current.offsetHeight / SQUARE_SIZE),
        cols: Math.floor(gridRef?.current.offsetWidth / SQUARE_SIZE),
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex flex-col w-full h-screen gap-4'>
      <header className='w-full h-8vh bg-amber-100 text-gray-700'>
        <Navbar setAlgo={setAlgo} />
      </header>

      <main className='flex mx-auto w-full max-w-1000px h-[92vh]'>
        <aside className='w-15% flex flex-col gap-4'>
          <h1 className='text-2xl font-semibold'>Actions</h1>
          <button onClick={() => setGrid((grid) => resetGrid(grid))}>
            Clear Grid
          </button>
          <button onClick={() => setGrid((grid) => getRandomMaze(grid))}>
            Create Random Maze
          </button>
        </aside>
        <Grid gridRef={gridRef} grid={grid} />
      </main>
    </div>
  );
}
