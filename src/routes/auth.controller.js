const User = require("../models/users.model");
const Tokens = require("../models/tokens.model");

const bcrypt = require("bcrypt-node");
const jwt = require("jsonwebtoken");

const { generateAccessToken } = require(".././auth");

async function loginUser(req, res, next) {
  try {
    let { email, password } = req.body;
    let [[user], _] = await User.findByEmail(email); //gets the user by email
    let isValid = bcrypt.compareSync(password, user.password);
    let user_id = user.user_id;
    let validUser = { user: user_id };
    let [[savedToken], fields] = await Tokens.getToken(user_id);
    if (!isValid) {
      return res.sendStatus(400);
    }
    const accessToken = generateAccessToken(validUser);

    let refreshToken = jwt.sign(validUser, process.env.REFRESH_TOKEN);

    if (savedToken) {
      savedToken = savedToken.user_token;
      return res.status(200).json({
        data: {
          accessToken,
          refreshToken: savedToken,
        },
      });
    } else {
      let token = new Tokens(refreshToken, user_id);
      token = await token.addToken();
      return res.status(200).json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({ message: "invalid details" });
  }
}

async function registerUser(req, res) {
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
    console.log(err);
    res.status(400).json({ message: "user already exists" });
  }
}

async function tokenRefresh(req, res) {
  const refreshToken = req.body.token;
  try {
    if (refreshToken === null) return res.sendStatus(401);
    let [[token], _] = await Tokens.getToken(refreshToken);
    console.log(token);
    let user_id = token.users_user_id;
    // if (!token) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      // if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user_id });
      return res.json({ accessToken: accessToken });
    });
  } catch (err) {
    console.log(err);
  }
}

async function tokenDelete(req, res, next) {}

module.exports = {
  loginUser,
  registerUser,
  tokenRefresh,
  tokenDelete,
};
