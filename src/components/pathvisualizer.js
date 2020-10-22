import React, { useState, useEffect } from "react";
import Node from "./node/node";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { randomMaze } from "./mazes/randomMaze";
import { useSelector, useDispatch } from "react-redux";
import { clearedBoard } from "../actions/clearboard";
import { noAlgo } from "../actions/visualizeAlgo";
import { clearedPath } from "../actions/clearpath";
import { NoMaze } from "../actions/mazes";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  //-----------Clear Board Or Path-------------------------------------//
  const dispatch = useDispatch();
  const isClearBoardPressed = useSelector((state) => state.clearBoard);
  const isClearPathPressed = useSelector((state) => state.clearPath);
  const ClearPressed = () => {
    if (isClearBoardPressed) {
      setGrid(getInitialGrid());
      console.log("grid", grid);
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          //console.log("grid node", grid[row][col]);
          document.getElementById(
            `node-${grid[row][col].row}-${grid[row][col].col}`
          ).className = "node ";
        }
      }
      document.getElementById(
        `node-${START_NODE_ROW}-${START_NODE_COL}`
      ).className = "node node-start";

      document.getElementById(
        `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
      ).className = "node node-finish";
      dispatch(noAlgo());
      dispatch(clearedBoard());
    }
    if (isClearPathPressed) {
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          if (!grid[row][col].isWall) {
            grid[row][col] = createNode(col, row);
            document.getElementById(
              `node-${grid[row][col].row}-${grid[row][col].col}`
            ).className = "node ";
          }
        }
      }
      document.getElementById(
        `node-${START_NODE_ROW}-${START_NODE_COL}`
      ).className = "node node-start";

      document.getElementById(
        `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
      ).className = "node node-finish";
      dispatch(noAlgo());
      dispatch(clearedPath());
    }
  };

  ClearPressed();

  //-----------Visualize Pathfinding Algorithms----------------//

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const algo = useSelector((state) => state.visualizeAlgo);

  const visualizeDijkstra = () => {
    if (algo === "dijkstra") {
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    dispatch(noAlgo());
  };
  visualizeDijkstra();

  //--------------Generate Maze---------------------//

  const maze = useSelector((state) => state.maze);
  const visualizeRandomMaze = () => {
    if (maze === "random") {
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          if (!grid[row][col].isStart && !grid[row][col].isFinish) {
            grid[row][col] = createNode(col, row);
            document.getElementById(
              `node-${grid[row][col].row}-${grid[row][col].col}`
            ).className = "node ";
          }
        }
      }
      document.getElementById(
        `node-${START_NODE_ROW}-${START_NODE_COL}`
      ).className = "node node-start";
      document.getElementById(
        `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
      ).className = "node node-finish";

      const randomGrid = randomMaze(grid);
      setGrid(randomGrid);
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          if (grid[row][col].isWall) {
            document.getElementById(
              `node-${grid[row][col].row}-${grid[row][col].col}`
            ).className = "node node-wall";
          }
        }
      }
    }

    dispatch(NoMaze());
  };
  visualizeRandomMaze();

  if (grid.length > 0) console.log("node grid", grid[0][0]);

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} style={{ margin: -4 }}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                  row={row}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PathfindingVisualizer;
