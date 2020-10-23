const startVisualizeReducer = (state = false, action) => {
  switch (action.type) {
    case "START_ALGO":
      return true;
    default:
      return false;
  }
};

export default startVisualizeReducer;
