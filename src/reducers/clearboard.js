const clearBoardReducer = (state = false, action) => {
  switch (action.type) {
    case "CLEAR_BOARD":
      return true;
    case "BOARD_CLEARED":
      return false;
    default:
      return state;
  }
};

export default clearBoardReducer;
