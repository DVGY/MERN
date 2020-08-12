import React, { useState } from 'react';

import FormValidation from '../../utils/FormValidation';
import validationRules from '../../utils/signupValidationRules';

import { connect } from 'react-redux';

import { signupUser } from '../../redux/auth/authActions';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../login-form/login-style.scss';
import { Redirect } from 'react-router-dom';

import Alerts from '../alerts/Alerts';

const SignUpForm = ({ signupUser, isUserAuthenticated, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  //formValidation now points to newly created object and have all validationRulesArray
  const formValidationRules = new FormValidation(validationRules);

  //Before submission we consider form to be valid state so return Generic Type Field with valid true
  const [formValidation, setFormValidation] = useState(
    formValidationRules.validationRuleFieldTypes()
  );
  // console.log(formValidation);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const validation = formValidationRules.validate(formData);
    // console.log(validation);
    setFormValidation(validation);

    if (validation.isValid) {
      signupUser(name, email, password, confirmPassword);
    }

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (isUserAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Row className="min-vh-100 mx-0">
      {/* Login Form*/}
      {error && <Alerts />}
      <Col
        xs={{ span: 8, offset: 2 }}
        md={{ span: 5, offset: 1 }}
        lg={{ span: 3, offset: 1 }}
        className="my-auto "
      >
        <Form noValidate onSubmit={handleSignup}>
          <h3 className="mb-5">CREATE YOUR ACCOUNT</h3>
          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Frist Name Last Name"
              name="name"
              value={name}
              onChange={handleChange}
              isInvalid={formValidation.name.isInvalid}
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formValidation.name.message}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group className="mb-4">
            <Form.Label className="label-font-size">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="*********"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              isInvalid={formValidation.confirmPassword.isInvalid}
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              {formValidation.confirmPassword.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="tertiary">
            {' '}
            SIGN UP
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
const mapDispatchToProps = (dispatch) => ({
  signupUser: (name, email, password, confirmPassword) =>
    dispatch(signupUser(name, email, password, confirmPassword)),
});
const mapStateToProps = (state) => ({
  isUserAuthenticated: state.auth.isUserAuthenticated,
  error: state.auth.error,
  currentUser: state.auth.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
