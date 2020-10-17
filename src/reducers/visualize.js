const VisualizeAlgoReducer = (state = "", action) => {
  switch (action.type) {
    case "DIJKSTRA":
      return "dijkstra";
    case "A_STAR":
      return "a_star";
    default:
      return state;
  }
};

export default VisualizeAlgoReducer;
