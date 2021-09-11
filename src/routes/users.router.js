const express = require("express");
const { getUser,registerUser } = require("./users.controller");
const usersRouter = express.Router();

usersRouter.post("/user/login", getUser);
usersRouter.post("/user/register", registerUser);


module.exports = usersRouter;
