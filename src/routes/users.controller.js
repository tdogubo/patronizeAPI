const User = require("../models/users.model");
const bcrypt = require("bcrypt-node");

async function getUser(req, res) {
  try {
    let { email, password } = req.body;
    let [[user], _] = await User.findByEmail(email);
    let hash = user.password;
    // return console.log(user);
    return res.status(200).json({ message: hash });
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
