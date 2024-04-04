const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // refreshTokens: {}
});

// Hashing the password before saving it to the database
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
// Method to compare password before login
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};
// Method to generate access token
userSchema.methods.generateAccessToken = function() {
  const user = this;
  const data = { _id: user._id, email:user.email,username:user.username }
  const token = jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
  return token;
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
  const user = this;
  const data = { _id: user._id, email:user.email,username:user.username }
  const refreshToken = jwt.sign(data , process.env.REFRESH_TOKEN, { expiresIn: '7d' });
  return refreshToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
