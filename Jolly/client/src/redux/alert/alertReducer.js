import alertTypes from './alertTypes';

const INITIAL_STATE = {
  showAlert: true,
  alertMsg: undefined,
};

export const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alertTypes.SHOW_ALERT:
      return {
        ...state,
        alertMsg: action.payload,
        showAlert: true,
      };
    case alertTypes.HIDE_ALERT:
      return {
        ...state,

        showAlert: false,
      };

    default:
      return state;
  }
};
export default alertReducer;
