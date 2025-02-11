import type { NodeType } from "../types/node.type";

type Props = {
  node: NodeType;
  animatedWallNodes: Set<string>;
  animatedVisitedNodes: Set<string>;
  animatedShortestPathNodes: Set<string>;
};

export function Node(props: Props) {
  const {
    node,
    animatedWallNodes,
    animatedVisitedNodes,
    animatedShortestPathNodes,
  } = props;

  return (
    <div
      id={`node-${node.row}-${node.col}`}
      className={`w-30px h-30px border-1 border-blue-500 flex items-center justify-center ${
        animatedWallNodes.has(`node-${node.row}-${node.col}`)
          ? "animate-wallAnimation"
          : ""
      } ${
        animatedVisitedNodes.has(`node-${node.row}-${node.col}`)
          ? "animate-visitedAnimation"
          : ""
      } ${
        animatedShortestPathNodes.has(`node-${node.row}-${node.col}`)
          ? "animate-pathAnimation"
          : ""
      }`}>
      {node.isStart && (
        <div className='i-lucide:target w-7 h-7 bg-purple-700' />
      )}
      {node.isFinish && (
        <div className='i-lucide:circle-x w-7 h-7 bg-purple-700' />
      )}
    </div>
  );
}
