import React from 'react';
import NotFoundSVG from './NotFoundSVG';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './not-found.scss';

const NotFound = () => {
  return (
    <Container fluid>
      <Row className="align-items-center flex-column justify-content-center min-vh-100 bg-not-found--custom">
        <NotFoundSVG className="not-found-svg-container" />
        <h2 className="text-center text-primary-whitish">OOPS !!! Not Found</h2>
      </Row>
    </Container>
  );
};

export default NotFound;
