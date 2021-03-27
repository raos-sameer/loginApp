const logInDetails = {
  loggedInUser: "",
};

const reducer = (state = logInDetails, action) => {
  if (action.type === "LOGGED_IN_USER") {
    return {
      ...state,
      loggedInUser: action.payload,
    };
  }
};

export default reducer;
