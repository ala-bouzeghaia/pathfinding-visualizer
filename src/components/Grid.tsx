import { Node } from "./Node";
import type { NodeType } from "../types/node.type";

type Props = {
  gridRef: React.RefObject<HTMLDivElement>;
  grid: NodeType[][];
};

export function Grid(props: Props) {
  const { gridRef, grid } = props;

  return (
    <div
      // className={`w-85% h-full grid grid-cols-[repeat(${numCols},30px)] grid-rows-[repeat(${numRows},30px)] gap-0`}
      className={`w-85% h-full flex flex-col gap-0`}
      ref={gridRef}>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx} className='flex flex-row gap-0'>
            {row.map((node, nodeIdx) => {
              return <Node key={nodeIdx} node={node} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
