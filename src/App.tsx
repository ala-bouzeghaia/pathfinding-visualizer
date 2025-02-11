import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Grid } from "./components/Grid";
import type { NodeType } from "./types/node.type";

import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  NUMBER_OF_COLS,
  NUMBER_OF_ROWS,
  START_NODE_COL,
  START_NODE_ROW,
} from "./utils/consts";
import { getInitialGrid, clearPath } from "./utils/grids";
import { getRandomMaze, getRecursiveDivisionMaze } from "./utils/mazes";
import { aStar, bfs, dijkstra, getShortestPath } from "./utils/algos";

export function App() {
  const [algo, setAlgo] = useState<{ name: string; isRunning: boolean }>({
    name: "",
    isRunning: false,
  });

  const numRows = NUMBER_OF_ROWS;
  const numCols = NUMBER_OF_COLS;

  const initialGrid = getInitialGrid(numRows, numCols);
  const [grid, setGrid] = useState<NodeType[][]>(initialGrid);

  const [action, setAction] = useState("");

  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<NodeType[]>(
    []
  );
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[]
  >([]);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div className='flex flex-col h-screen gap-4 overflow-auto'>
      <header className='h-8vh min-h-40px bg-sky-50 text-gray-800 border-b-1 border-sky-300'>
        <Navbar
          openMobileMenu={openMobileMenu}
          setOpenMobileMenu={setOpenMobileMenu}
        />
      </header>

      <main className='flex h-92vh min-h-500px px-4 gap-4 w-full'>
        <aside
          className={`${
            openMobileMenu
              ? "position-absolute right-0 top-8vh z-10 w-200px bg-gray-800 text-sky-50 h-92vh flex flex-col gap-2 py-4"
              : "hidden"
          } sm:(w-200px bg-gray-800 text-sky-50 h-full flex flex-col gap-2 py-4)`}>
          <ul className='flex flex-col'>
            <li className='px-3 font-bold text-lg'>Actions</li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                onClick={() => {
                  setGrid(getInitialGrid(numRows, numCols));
                  setAlgo((algo) => ({ ...algo, isRunning: false }));
                  setAction("clearGrid");
                }}>
                Clear Grid
              </button>
            </li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                onClick={() => {
                  setGrid((grid) => clearPath(grid));
                  setAlgo((algo) => ({ ...algo, isRunning: false }));
                  setAction("clearPath");
                }}>
                Clear Path
              </button>
            </li>
          </ul>
          <ul className='flex flex-col'>
            <li className='text-lg font-bold px-3 pb-2'>Mazes</li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                onClick={() => {
                  setGrid((grid) => getRandomMaze(grid));
                  setAlgo((algo) => ({ ...algo, isRunning: false }));
                  setVisitedNodesInOrder([]);
                  setNodesInShortestPathOrder([]);
                  setAction("createRandomMaze");
                }}>
                Create Random Maze
              </button>
            </li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                onClick={() => {
                  setGrid((grid) => getRecursiveDivisionMaze(grid));
                  setAlgo((algo) => ({ ...algo, isRunning: false }));
                  setAction("createRecursiveMaze");
                }}>
                Create Recursive Maze
              </button>
            </li>
          </ul>
          <ul className='flex flex-col'>
            <li className='text-lg font-bold px-3 pb-2'>Algorithms</li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                disabled={algo.name !== "Dijkstra" && algo.isRunning}
                onClick={() => {
                  setOpenMobileMenu(false);
                  setAlgo({ name: "Dijkstra", isRunning: true });
                  setVisitedNodesInOrder(dijkstra(startNode, finishNode, grid));
                  setNodesInShortestPathOrder(getShortestPath(finishNode));
                }}>
                Run Dijkstra
              </button>
            </li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                disabled={algo.name !== "Astar" && algo.isRunning}
                onClick={() => {
                  setOpenMobileMenu(false);
                  setAlgo({ name: "Astar", isRunning: true });
                  setVisitedNodesInOrder(aStar(startNode, finishNode, grid));
                  setNodesInShortestPathOrder(getShortestPath(finishNode));
                }}>
                Run A*
              </button>
            </li>
            <li>
              <button
                className='w-full text-left pl-5 py-2 hover:bg-gray-700 disabled:(opacity-50 cursor-not-allowed hover:bg-gray-800)'
                disabled={algo.name !== "BFS" && algo.isRunning}
                onClick={() => {
                  setOpenMobileMenu(false);
                  setAlgo({ name: "BFS", isRunning: true });
                  setVisitedNodesInOrder(bfs(startNode, finishNode, grid));
                  setNodesInShortestPathOrder(getShortestPath(finishNode));
                }}>
                Run BFS
              </button>
            </li>
          </ul>
        </aside>
        <div className='w-full sm:max-w-80% overflow-auto flex-none'>
          <Grid
            grid={grid}
            algo={algo}
            setAlgo={setAlgo}
            action={action}
            visitedNodesInOrder={visitedNodesInOrder}
            nodesInShortestPathOrder={nodesInShortestPathOrder}
          />
        </div>
      </main>
    </div>
  );
}
