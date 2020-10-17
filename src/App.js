import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";
import Navbar from "./components/navbar";
import PathfindingVisualizer from "./components/visualizer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <PathfindingVisualizer />
      </Router>
    </div>
  );
}

export default App;
