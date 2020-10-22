import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dijkstraAlgo } from "../actions/visualizeAlgo";
import { clearBoard } from "../actions/clearboard";
import { clearPath } from "../actions/clearpath";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <Link to="/" className="navbar-brand">
        Pathfinding Visualizer{" "}
      </Link>

      <div className="collapse navbar-collapse">
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
              <button className="dropdown-item">Dijkstra's Algorithm</button>
              <button className="dropdown-item">A* Search</button>
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
              <button className="dropdown-item">Random Maze</button>
              <button className="dropdown-item">Recursive Division</button>
            </div>
          </li>

          <li className="nav-item">
            <button
              className="visualize-button nav-link active"
              onClick={() => dispatch(dijkstraAlgo())}
            >
              Visualize{" "}
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
