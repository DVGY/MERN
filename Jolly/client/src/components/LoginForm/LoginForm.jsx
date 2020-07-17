import React from 'react';

import './login-style.scss';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LoginForm = () => {
  return (
    <Row className="min-vh-100">
      {/* Login Form*/}
      <Col
        xs={{ span: 8, offset: 2 }}
        md={{ span: 4, offset: 1 }}
        lg={{ span: 3, offset: 1 }}
        className="my-auto "
      >
        <Form>
          <h3 className="mb-5">LOG INTO YOUR ACCOUNT</h3>

          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*********"
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="tertiary">
            {' '}
            LOGIN
          </Button>
        </Form>
      </Col>
      {/* SVG */}

      <Col className="d-none d-md-flex flex-md-column justify-content-center bg--custom">
        <h2 className="text-center text-primary-whitish w-25 align-self-center motto--custom">
          CONNECT <span>&</span> SHARE
        </h2>
      </Col>
    </Row>
  );
};

export default LoginForm;
