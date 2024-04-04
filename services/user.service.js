const User = require("../models/user.model");

exports.CreateUser= async (data)=>{
    const result = await User.create(data);
    return result;
}
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
  };