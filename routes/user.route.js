const express = require("express");
const { signup, signin, refreshAccessToken } = require("../controllers/user.controller");
const router =express.Router();


router.route("/signup").post(signup).get(signin)
router.route("/signin").post(signin)
router.route("/refresh").post(refreshAccessToken)
module.exports = router;