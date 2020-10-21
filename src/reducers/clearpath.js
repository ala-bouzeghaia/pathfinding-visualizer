const clearPathReducer = (state = false, action) => {
  switch (action.type) {
    case "CLEAR_PATH":
      return true;
    case "PATH_CLEARED":
      return false;
    default:
      return state;
  }
};

export default clearPathReducer;
