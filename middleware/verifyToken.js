const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.verifyAccessToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
              status: "fail",
              error: "You are not logged in"
            });
          }
           jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) return res.status(401).json({ success: false, message: 'Invalid access token' });
            req.user = decoded;
            next();
          });
    } catch (error) {
        next(new ErrorHandler(error.message, 400))
    }
  };