import alertTypes from './alertTypes';

export const showAlert = (alertMsg) => ({
  type: alertTypes.SHOW_ALERT,
  payload: alertMsg,
});

export const hideAlert = () => ({
  type: alertTypes.HIDE_ALERT,
});

export const autoToggleAlert = (alertMsg) => (dispatch) => {
  dispatch(showAlert(alertMsg));

  setTimeout(() => dispatch(hideAlert()), 4000);
};
