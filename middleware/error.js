const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    console.log('error from ErrorHandler line 5', err);
    err.message = err.message || 'internal server error';
    //mongodb id error
    if (err.name === "castError") {
        const message = `resource not found ${err.path}`;
        err = new ErrorHandler(message, 400);
    };
    //duplicate key error
    if (err.code === 1100) {
        const message = `duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);

    }
    // jsonwebtoken error
    if (err.name === "JsonWebTokenError") {
        const message = 'your web token is expired, try again';
        err = new ErrorHandler(message, 400);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
module.exports = ErrorMiddleware;