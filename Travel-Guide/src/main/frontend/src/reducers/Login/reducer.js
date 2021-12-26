const initialState = {
  currentUser: {},
  isLoggedIn: false,
  UserType: "",
  token: undefined,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return {
        currentUser: payload,
        isLoggedIn: true,
        token: state.token,
      };
    case "SET_TYPE":
      return {
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        UserType: payload,
        token: state.token,
      };
    case "SET_TOKEN":
      return {
        currentUser: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        token: payload,
      };
    case "LOG_OUT":
      return {
        currentUser: {},
        isLoggedIn: false,
        token: undefined,
        UserType: "",
      };
    default:
      return state;
  }
};

export default usersReducer;
