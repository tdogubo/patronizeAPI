const express = require("express");

const { loginUser, registerUser, tokenRefresh, tokenDelete } = require("./auth.controller");
const authRouter = express.Router();

authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/register", registerUser);
authRouter.post("/token/:id", tokenRefresh);

authRouter.delete("/auth/logout", tokenDelete);

module.exports = authRouter;
