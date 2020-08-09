import authTypes from './authTypes';

const INITIAL_STATE = {
  currentUser: null,
  isUserAuthenticated: false,
  loading: true,
  token: null,
  error: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isUserAuthenticated: true,
        loading: false,
        token: null,
      };
    case authTypes.AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isUserAuthenticated: false,
        loading: false,
        token: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
