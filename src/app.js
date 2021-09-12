const express = require("express");
const app = express();

const usersRouter = require("./routes/users.router");
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
app.use(express.json());
app.use(usersRouter);

module.exports = app;
