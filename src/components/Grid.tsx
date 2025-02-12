import { useEffect, useRef, useState } from "react";
import { Node } from "./Node";
import type { NodeType } from "../types/node.type";

type Props = {
  grid: NodeType[][];
  action: string;
  algo: { name: string; isRunning: boolean };
  setAlgo: React.Dispatch<
    React.SetStateAction<{ name: string; isRunning: boolean }>
  >;
  visitedNodesInOrder: NodeType[];
  nodesInShortestPathOrder: NodeType[];
};

export function Grid(props: Props) {
  const {
    grid,
    action,
    algo,
    setAlgo,
    visitedNodesInOrder,
    nodesInShortestPathOrder,
  } = props;
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const timeouts = useRef<number[]>([]); // Store all timeouts

  const [animatedWallNodes, setAnimatedWallNodes] = useState(new Set<string>());
  const [animatedVisitedNodes, setAnimatedVisitedNodes] = useState(
    new Set<string>()
  );
  const [animatedShortestPathNodes, setAnimatedShortestPathNodes] = useState(
    new Set<string>()
  );

  useEffect(() => {
    if (action === "clearGrid") {
      setAnimatedWallNodes(new Set());
      setAnimatedVisitedNodes(new Set());
      setAnimatedShortestPathNodes(new Set());
    }

    if (action === "clearPath") {
      setAnimatedVisitedNodes(new Set());
      setAnimatedShortestPathNodes(new Set());
    }

    if (action === "createRandomMaze" || action === "createRecursiveMaze") {
      setAnimatedVisitedNodes(new Set());
      setAnimatedShortestPathNodes(new Set());
      setAnimatedWallNodes(
        new Set(
          grid
            .flat()
            .filter((node) => node.isWall)
            .map((node) => `node-${node.row}-${node.col}`)
        )
      );
    }
  }, [action, grid]);

  useEffect(() => {
    timeouts.current = [];
    if (algo.name.length > 0) {
      setAnimatedVisitedNodes(new Set());
      setAnimatedShortestPathNodes(new Set());
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        if (!algo.isRunning) break; // Stop if algo.isRunning is false

        const timeoutId = setTimeout(() => {
          if (!algo.isRunning) return; // Prevent execution if stopped
          setAnimatedVisitedNodes((prev) =>
            new Set(prev).add(
              `node-${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
            )
          );
        }, 100 * i);

        timeouts.current.push(timeoutId);
      }

      const pathTimeoutId = setTimeout(() => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          const timeoutId = window.setTimeout(() => {
            if (!algo.isRunning) return; // Prevent execution if stopped
            setAnimatedVisitedNodes((prev) => {
              const newSet = new Set(prev);
              newSet.delete(
                `node-${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`
              );
              return newSet;
            });
            setAnimatedShortestPathNodes((prev) =>
              new Set(prev).add(
                `node-${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`
              )
            );
          }, 100 * i);
          timeouts.current.push(timeoutId);
        }
      }, visitedNodesInOrder.length * 100);

      timeouts.current.push(pathTimeoutId);
    }

    // Cleanup: Clear all timeouts if algo.isRunning becomes false or component unmounts
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = []; // Reset timeout list
    };
  }, [algo, nodesInShortestPathOrder, visitedNodesInOrder]);

  useEffect(() => {
    if (visitedNodesInOrder.length > 0 && nodesInShortestPathOrder.length > 0) {
      const totalTime =
        (visitedNodesInOrder.length + nodesInShortestPathOrder.length) * 100;
      const finishTimeoutId = setTimeout(() => {
        setAlgo({ name: "", isRunning: false });
      }, totalTime);

      timeouts.current.push(finishTimeoutId);
    }

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [visitedNodesInOrder, nodesInShortestPathOrder, setAlgo]);

  const handleMouseEnter = (e: MouseEvent) => {
    if (!mouseIsPressed) return;
    const element = e.target as HTMLElement;
    if (element.id.startsWith("node-")) {
      const [, row, col] = element.id.split("-").map(Number);
      grid[row][col].isWall = true;
      setAnimatedWallNodes((prev) => new Set(prev).add(`node-${row}-${col}`));
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setMouseIsPressed(true);
    const element = e.target as HTMLElement;
    if (element.id.startsWith("node-")) {
      const [, row, col] = element.id.split("-").map(Number);
      grid[row][col].isWall = !grid[row][col].isWall;
      if (grid[row][col].isWall) {
        setAnimatedWallNodes((prev) => new Set(prev).add(`node-${row}-${col}`));
      } else {
        setAnimatedWallNodes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`node-${row}-${col}`);
          return newSet;
        });
      }
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  });

  return (
    <div className='w-1070px h-full flex flex-col gap-0 overflow-auto flex-none'>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className='flex flex-row gap-0'>
            {row.map((node) => {
              return (
                <Node
                  key={`node-${node.row}-${node.col}`}
                  node={node}
                  animatedWallNodes={animatedWallNodes}
                  animatedVisitedNodes={animatedVisitedNodes}
                  animatedShortestPathNodes={animatedShortestPathNodes}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
