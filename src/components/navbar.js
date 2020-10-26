import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dijkstraAlgo, a_starAlgo } from "../actions/algorithms";
import { clearBoard } from "../actions/clearboard";
import { clearPath } from "../actions/clearpath";
import { RandomMaze, RecursiveDivision } from "../actions/mazes";
import { startVisualizeAlgo } from "../actions/visualize";

const Navbar = () => {
  const dispatch = useDispatch();
  const algo = useSelector((state) => state.visualizeAlgo);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="navbar-brand">
        <Link to="/">Pathfinding Visualizer </Link>
      </div>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#NavbarMenu"
        aria-controls="NavbarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="toggle-button navbar-toggler-icon"></span>
      </button> */}

      <div /* className="collapse navbar-collapse" id="NavbarMenu" */>
        <ul className="nav nav-pills">
          <li className="nav-item dropdown">
            <button
              className="link-button nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Algorithms
            </button>

            <div className="dropdown-menu">
              <button
                className="link-button dropdown-item"
                onClick={() => dispatch(dijkstraAlgo())}
              >
                Dijkstra's Algorithm
              </button>
              <button
                className="link-button dropdown-item"
                onClick={() => dispatch(a_starAlgo())}
              >
                A* Search
              </button>
            </div>
          </li>

          <li className="nav-item dropdown">
            <button
              className="link-button nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mazes
            </button>
            <div className="dropdown-menu">
              <button
                className=" link-button dropdown-item"
                onClick={() => dispatch(RandomMaze())}
              >
                Random Maze
              </button>
              <button
                className="link-button dropdown-item"
                onClick={() => dispatch(RecursiveDivision())}
              >
                Recursive Division
              </button>
            </div>
          </li>

          <li className="nav-item">
            <button
              className="visualize-button nav-link active"
              onClick={() => dispatch(startVisualizeAlgo())}
            >
              Visualize{" "}
              {algo === "dijkstra"
                ? "Dijkstra"
                : algo === "a_star"
                ? "A* Search"
                : ""}
            </button>
          </li>

          <li className="nav-item">
            <button
              className="link-button"
              onClick={() => dispatch(clearBoard())}
            >
              Clear Board{" "}
            </button>
          </li>

          <li className="nav-item">
            <button
              className="link-button"
              onClick={() => dispatch(clearPath())}
            >
              Clear Path{" "}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
