import type { NodeType } from "../types/node.type";

type Props = {
  node: NodeType;
};

export function Node(props: Props) {
  const {
    node: { isStart, isFinish, isWall },
  } = props;

  return (
    <div
      className={`w-30px h-30px border-1 border-blue-500 flex items-center justify-center ${
        isWall && "animate-wallAnimation bg-[rgb(12,53,71)]"
      }`}>
      {isStart && <div className='i-lucide:target w-7 h-7 bg-purple-700' />}
      {isFinish && <div className='i-lucide:circle-x w-7 h-7 bg-purple-700' />}
    </div>
  );
}
