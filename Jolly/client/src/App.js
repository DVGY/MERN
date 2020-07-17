import React from 'react';

import LoginForm from './components/LoginForm/LoginForm';

import Navbar from './components/navbar/NavBar';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <LoginForm />
    </React.Fragment>
  );
};

export default App;
