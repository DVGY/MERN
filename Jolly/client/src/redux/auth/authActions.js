import authTypes from './authTypes';
import axios from 'axios';

export const loginSuccess = (loginSuccessData) => ({
  type: authTypes.LOGIN_SUCCESS,
  payload: loginSuccessData,
});

export const signUpSuccess = (signUpSuccessData) => ({
  type: authTypes.SIGNUP_SUCCESS,
  payload: signUpSuccessData,
});

export const authError = (error) => ({
  type: authTypes.AUTH_ERROR,
  payload: error,
});

/**Redux thunk will hear this */
export const loginUser = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const response = await axios.post('api/users/login', { email, password });
    console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(authError(error.response));
  }
};
