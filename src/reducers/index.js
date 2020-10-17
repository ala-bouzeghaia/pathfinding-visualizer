import VisualizeAlgoReducer from "./visualize";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  visualizeAlgo: VisualizeAlgoReducer,
});

export default allReducers;
