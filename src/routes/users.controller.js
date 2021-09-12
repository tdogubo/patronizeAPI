const User = require("../models/users.model");
const bcrypt = require("bcrypt-node");
const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  try {
    let { email, password } = req.body;
    let [[user], _] = await User.findByEmail(email);
    let hash = user.password;
    let isValid = bcrypt.compareSync(password, hash);
    let validUser = { user: email };
    if (isValid) {
      const accessToken = jwt.sign(validUser, process.env.ACCESS_TOKEN);
      //return res.status(200).json({ message: `Welcome ${user.first_name}` });
      res.json({ accessToken: accessToken });
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
    return res
      .status(200)
      .json({ message: `Welcome user ${firstName} ${[user]}!` });
  } catch (err) {
    next(res.status(400).json({ message: "user already exists" }));
  }
}

module.exports = {
  getUser,
  registerUser,
};
