import React, { useRef } from "react";
import "./node.css";

const Node = (props) => {
  const extraClassName = props.isFinish
    ? "node-finish"
    : props.isStart
    ? "node-start"
    : props.isWall
    ? "node-wall"
    : "";

  const ref = useRef(`node-${props.row}-${props.col}`);

  return (
    <div
      id={`node-${props.row}-${props.col}`}
      ref={ref}
      className={`node ${extraClassName}`}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
      onMouseUp={() => props.onMouseUp()}
    ></div>
  );
};

export default Node;
