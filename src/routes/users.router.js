const express = require("express");
const userProfile = require("./users.controller");

const usersRouter = express.Router();

usersRouter.post("/profile", userProfile);

module.exports = usersRouter;
