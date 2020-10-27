export default function reducers(state, { type, payload }) {
  switch (type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignout: false,
        userToken: payload,
      };
    case "SIGN_OUT":
      return {
        isSignout: true,
        userToken: null,
        currentUser: null,
      };
    case "RE_SIGN_IN":
      return {
        isLoading: false,
        isSignout: false,
        userToken: null,
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "SET_SEARCH_STRING":
      return {
        ...state,
        searchString: payload,
      };
    default:
      return state;
  }
}
