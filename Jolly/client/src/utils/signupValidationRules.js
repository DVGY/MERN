const signupValidationRule = [
  {
    field: 'name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Name is Required',
  },
  {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'Email is required.',
  },
  {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'Email is not valid.',
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Password is required',
  },
  {
    field: 'confirmPassword',
    method: 'isEmpty',
    validWhen: false,
    message: 'Password is required',
  },
  {
    field: 'confirmPassword',
    method: function passwordMatch(confirmPassword, userInputs) {
      return confirmPassword === userInputs['password'];
    },
    validWhen: true,
    message: 'Password and Confirm Password do NOT match',
  },
];
export default signupValidationRule;
