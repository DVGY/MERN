const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//@Route   api/users
//@desc    Test Route
//@access  Public
router
  .route('/')
  .get(authController.protect, userController.getUser)
  .post(userController.createUser);

module.exports = router;
