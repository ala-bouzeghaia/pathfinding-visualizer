import VisualizeAlgoReducer from "./visualizeAlgo";
import clearBoardReducer from "./clearboard";
import clearPathReducer from "./clearpath";
import MazeReducer from "./mazes";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  visualizeAlgo: VisualizeAlgoReducer,
  clearBoard: clearBoardReducer,
  clearPath: clearPathReducer,
  maze: MazeReducer,
});

export default allReducers;
