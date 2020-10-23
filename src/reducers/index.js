import VisualizeAlgoReducer from "./algorithms";
import clearBoardReducer from "./clearboard";
import clearPathReducer from "./clearpath";
import MazeReducer from "./mazes";
import startVisualizeReducer from "./visualize";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  visualizeAlgo: VisualizeAlgoReducer,
  clearBoard: clearBoardReducer,
  clearPath: clearPathReducer,
  maze: MazeReducer,
  startVisualize: startVisualizeReducer,
});

export default allReducers;
