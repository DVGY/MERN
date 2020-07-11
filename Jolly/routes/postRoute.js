//@Route   api/posts
//@desc    Test Route
//@access  Public

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Post Route');
});
