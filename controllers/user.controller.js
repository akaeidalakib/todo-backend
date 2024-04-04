const { CreateUser, findUserByEmail } = require("../services/user.service")
const ErrorHandler = require("../utils/ErrorHandler")
const jwt = require("jsonwebtoken")
exports.signup = async(req,res,next)=>{
try {
    const result = await CreateUser(req.body)
    res.status(200).json({
        status:"success",
        message:"user created successfully",
        data:result
    })
} catch (error) {
    next(new ErrorHandler(error.message, 400))
}
}
exports.signin = async (req,res,next) => {
    try {
        const {email, password}= req.body;
        if (!email || !password) {
            return res.status(401).json({
              status: "fail",
              error: "Please provide your credentials",
            });
          }
      const user = await findUserByEmail(email)

      if (!user) {
        return res.status(401).json({
          status: "fail",
          error: "No user found. Please create an account",
        });
      }
  
      const isPasswordValid = user.comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(403).json({
          status: "fail",
          error: "Password is not correct",
        });
      }
  
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      userData = {username:user.username,email:user.email}
      res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        accessToken:accessToken,
        refreshToken:refreshToken,
        data:userData
      });
    } catch (error) {
        next(new ErrorHandler(error.message, 400))
    }
  };
  exports.getMe = async(req,res,next)=>{
    try {
      const {email}= req.body
      res.status(200).json({
        status: "success",
        massage: "user data get successfully",
        data:"",
    });
    } catch (error) {
      next(new ErrorHandler(error.message, 400))
    }
  }
  exports.refreshAccessToken = async (req,res,next) => {
    try {
        const {refreshToken}=req.body;
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        const user = await findUserByEmail(decoded.email);
        if (!user) {
            res.status(401).json({
                status: "fail",
                error: "user not found",
                  });
        };
        if (!decoded) {
            res.status(401).json({
            status: "fail",
            error: "Invalid token",
              });
        }
        // Extract the expiration time from the decoded token
    const refreshTokenExpDate = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the refresh token is expired
    if (refreshTokenExpDate < currentTime) {
        res.status(401).json({
            status: "fail",
            error: "Refresh token expired",
        });
    }
    
        const accessToken = user.generateAccessToken();
        res.status(200).json({
            status: "success",
            message: "Successfully created token",
            accessToken:accessToken,
        })
      } catch (error) {
        next(new ErrorHandler(error.message, 400))
      }
  };