import VisualizeAlgoReducer from "./visualize";
import clearBoardReducer from "./clearboard";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  visualizeAlgo: VisualizeAlgoReducer,
  clearBoard: clearBoardReducer,
});

export default allReducers;
