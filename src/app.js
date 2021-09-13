const express = require("express");
const {authToken} = require("./auth");
const app = express();

const authRouter = require("./routes/auth.router");
const usersRouter = require("./routes/users.router");

app.use(express.json());
app.use(authToken);
app.use(authRouter);
app.use(usersRouter);

module.exports = app;
