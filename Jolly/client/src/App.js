import React from 'react';

import Navbar from './components/navbar/NavBar';
import LoginForm from './components/login-form/LoginForm';
import SignUpForm from './components/sign-up-form/SignUpForm';
import NotFound from './components/not-found/NotFound';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
