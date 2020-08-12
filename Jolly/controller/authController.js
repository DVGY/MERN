const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.signup = async (req, res, next) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    const userExist = await User.findOne({ email }).select('+password -__v');

    if (userExist) {
      return res.status(400).json({
        status: 'fail',
        msg: 'An account with this email already exists',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const payload = newUser._id;
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // --- TO DO
    //1. Set res.cookie and it's httpOnly and secure
    //2. Remove hash Password from Postman output
    newUser.password = undefined;
    newUser.__v = undefined;
    res.status(201).json({ status: 'success', data: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 'fail', error: error.stack });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //1. Check if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', msg: 'Provide email and password' });
    }

    // Check if user exist and password is correct
    const user = await User.findOne({ email }).select('+password -__v');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ status: 'fail', msg: 'Incorrect email or password' });
    }

    const payload = user._id;
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // --- TO DO
    //1. Set res.cookie and it's httpOnly and secure
    //2. Remove hash Password from Postman output
    user.password = undefined;

    res.status(200).json({ status: 'success', data: user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 'fail', error: error.stack });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        msg: 'You are not logged in pls login in',
      });
    }

    //2. verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const _id = decoded.payload;
    const currentUser = await User.findById(decoded.payload);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        msg: 'User belonging to this token does not exist anymore',
      });
    }
    //TO DO
    // 4) // 4) Check if user changed password after the token was issued

    req.user = currentUser;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 'fail',
      err,
    });
  }

  next();
};
