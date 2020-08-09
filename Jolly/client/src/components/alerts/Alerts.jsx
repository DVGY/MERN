import React, { useState, useRef, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';

import './alerts-style.scss';

const Alerts = ({ data, status, statusText }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Alert
      variant={'danger'}
      className="position-absolute alert-box"
      show={show}
    >
      <Alert.Heading>{data.msg}</Alert.Heading>
      {}
    </Alert>
  );
};

export default Alerts;
