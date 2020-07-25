import React, { useState } from 'react';

import './login-style.scss';
import axios from 'axios';

import FormValidation from '../../utils/FormValidation';
import validationRules from '../../utils/loginValidationRules';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // formValidation now points to newly created object and have all validationRulesArray
  const formValidationRules = new FormValidation(validationRules);

  //Before submission we consider form to be valid state so return Generic Type Field with valid true
  const [formValidation, setFormValidation] = useState(
    formValidationRules.validationRuleFieldTypes()
  );

  const { email, password } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email, password);
    // console.log(event.currentTarget);

    const validation = formValidationRules.validate(formData);
    setFormValidation(validation);
    console.log(validation);
    axios
      .post('api/users/login', {})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  return (
    <Row className="min-vh-100">
      {/* Login Form*/}

      <Col
        xs={{ span: 8, offset: 2 }}
        md={{ span: 4, offset: 1 }}
        lg={{ span: 3, offset: 1 }}
        className="my-auto "
      >
        <Form noValidate onSubmit={handleLogin}>
          <h3 className="mb-5">LOG INTO YOUR ACCOUNT</h3>

          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              name="email"
              value={email}
              onChange={handleChange}
              isInvalid={formValidation.email.isInvalid}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formValidation.email.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*********"
              name="password"
              value={password}
              onChange={handleChange}
              isInvalid={formValidation.password.isInvalid}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {formValidation.password.message}
            </Form.Control.Feedback>
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
