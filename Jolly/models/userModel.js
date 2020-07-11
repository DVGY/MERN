const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User should have a name'],
  },
  email: {
    type: String,
    required: [true, 'User should have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a correct email'],
  },
  password: {
    type: String,
    required: [true, 'User should Enter a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'User should enter confirm password'],
    minlength: 8,
    select: false,

    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Passwords are not same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //1. Check password is modified or not (if )
  if (!this.isModified('password')) return next();

  //2. Hash the password
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
  console.log(this);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
