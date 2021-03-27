export const loginUser = (loggedInUser) => {
  return { type: "LOGGED_IN_USER", payload: loggedInUser };
};
