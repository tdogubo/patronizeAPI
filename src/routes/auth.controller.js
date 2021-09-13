const User = require("../models/users.model");
const Tokens = require("../models/tokens.model");

const bcrypt = require("bcrypt-node");
const jwt = require("jsonwebtoken");

const { generateAccessToken } = require(".././auth");

async function loginUser(req, res) {
  try {
    let { email, password } = req.body;
    let [[user], _] = await User.findByEmail(email); //gets the user by email
    let hash = user.password; //gets the password hash of user from db
    let isValid = bcrypt.compareSync(password, hash);
    let validUser = { user: user.user_id };
    if (isValid) {
      const accessToken = generateAccessToken(validUser);
      const refreshToken = jwt.sign(validUser, process.env.REFRESH_TOKEN);
      return res.json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    }
    return res.sendStatus(400);
  } catch (err) {
    console.log(err);
  }
}

async function registerUser(req, res, next) {
  let { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Invalid details" });
  }
  password = bcrypt.hashSync(password);
  let user = new User(email, password, firstName, lastName);
  try {
    user = await user.createUser();
    return res.status(200).json({ message: `Welcome ${firstName}!` });
  } catch (err) {
    next(res.status(400).json({ message: "user already exists" }));
  }
}

function tokenRefresh(req, res) {
  const refreshToken = req.body.token;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.user_id });
    return res.json({ accessToken: accessToken });
  });
}

async function tokenDelete(req, res, next) {}

module.exports = {
  loginUser,
  registerUser,
  tokenRefresh,
  tokenDelete,
};
