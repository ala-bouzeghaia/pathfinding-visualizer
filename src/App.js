import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./App.css";
import Navbar from "./components/navbar";
import PathfindingVisualizer from "./components/pathvisualizer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PathfindingVisualizer />
    </div>
  );
}

export default App;
