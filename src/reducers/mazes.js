const MazeReducer = (state = "", action) => {
  switch (action.type) {
    case "RANDOM_MAZE":
      return "random";
    case "RECURSIVE":
      return "recursive";
    case "NO_MAZE":
      return "";
    default:
      return state;
  }
};

export default MazeReducer;
