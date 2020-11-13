// action types
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const RE_SIGN_IN = "RE_SIGN_IN";
export const CURRENT_USER = "CURRENT_USER";
export const SET_SEARCH_STRING = "SET_SEARCH_STRING";
export const CATEGORY = "CATEGORY";

export const signIn = (userId) => ({
  type: SIGN_IN,
  payload: userId,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const reSignIn = () => ({
  type: RE_SIGN_IN,
  payload: null,
});

export const currentUser = (userData) => ({
  type: CURRENT_USER,
  payload: userData,
});

export const reduxSetSearchString = (newSearchString) => ({
  type: SET_SEARCH_STRING,
  payload: newSearchString,
});

export const reduxSetCategory = (currentCategory) => ({
  type: CATEGORY,
  payload: currentCategory,
});
