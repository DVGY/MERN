import React from 'react';

import Alert from 'react-bootstrap/Alert';

import { connect } from 'react-redux';

import './alerts-style.scss';

const Alerts = ({ showAlert, alertMsg }) => {
  return (
    <Alert
      variant={'danger'}
      className="position-absolute alert-box"
      show={showAlert}
    >
      <Alert.Heading>{alertMsg}</Alert.Heading>
      {}
    </Alert>
  );
};

const mapStateToProps = (state) => ({
  alertMsg: state.alert.alertMsg,
  showAlert: state.alert.showAlert,
});
export default connect(mapStateToProps)(Alerts);
