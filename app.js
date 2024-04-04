const express = require("express");
const cors = require("cors");
const app = express()
const ErrorMiddleware = require("./middleware/error")
//middlewares
;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// router import
const taskRoute = require('./routes/task.route');
const userRoute = require('./routes/user.route');
const { verifyAccessToken } = require("./middleware/verifyToken");

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

//routes setup
app.use('/api/tasks',verifyAccessToken, taskRoute)
app.use('/api/user', userRoute)
app.use(ErrorMiddleware)
module.exports = app;