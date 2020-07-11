//@Route   api/profile
//@desc    Test Route
//@access  Public

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Profile Route');
});
