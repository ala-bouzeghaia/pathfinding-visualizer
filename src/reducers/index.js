import VisualizeAlgoReducer from "./visualizeAlgo";
import clearBoardReducer from "./clearboard";
import clearPathReducer from "./clearpath";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  visualizeAlgo: VisualizeAlgoReducer,
  clearBoard: clearBoardReducer,
  clearPath: clearPathReducer,
});

export default allReducers;
