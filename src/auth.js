const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  if (!req.path.includes("/auth/") && !req.path.includes("/token")) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else next();
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "15s" });
}

module.exports = { authToken, generateAccessToken };
