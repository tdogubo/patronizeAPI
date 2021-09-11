const User = require("../models/users.model");
const bcrypt = require("bcrypt-node");

async function getUser(req, res) {
  let { email, password, firstName, lastName } = req.body;
  return res.status(404).json({ message: "no input yet" });
}

async function registerUser(req, res) {
  let { email, password, firstName, lastName } = req.body;
  password = bcrypt.hashSync(password);
  let user = new User(email, password, firstName, lastName);
  user = await user.createUser();
  return console.log(user);
}

module.exports = {
  getUser,
  registerUser,
};
