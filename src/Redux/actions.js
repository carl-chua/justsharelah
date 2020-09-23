// action types
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const RE_SIGN_IN = "RE_SIGN_IN";
export const CURRENT_USER = "GET_CURRENT_USER";
export const DEMO_HEADER = "DEMO_HEADER";

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
  
export const getCurrentUser = (userData) => ({
    type : CURRENT_USER,
    payload : userData,
});

export const demoHeader = (data) => ({
    type : DEMO_HEADER,
    payload: data,
});

