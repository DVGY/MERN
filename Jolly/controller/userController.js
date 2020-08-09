const express = require('express');
const User = require('../models/userModel');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res
      .status(200)
      .json({ status: 'success', result: user.length, data: user });
  } catch (error) {
    return res.status(400).json({ status: 'fail', msg: error.stack });
  }
};

exports.createUser = async (req, res, next) => {
  res.status(200).json({ msg: 'Please use the SignUp route' });

  next();
};
