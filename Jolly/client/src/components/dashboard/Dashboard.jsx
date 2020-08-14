import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ isUserAuthenticated }) => {
  if (!isUserAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>This is Dashboard</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.auth.isUserAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
