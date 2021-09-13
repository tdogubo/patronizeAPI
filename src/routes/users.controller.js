const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

async function userProfile(req, res) {
  try {
    let email = req.body.email;
    let [[user], _] = await User.findByEmail(email); //gets the user by email
    let { user_id, first_name, last_name } = user;
    let validUser = { user: user.user_id };
    jwt.sign(validUser, process.env.ACCESS_TOKEN);
    return res.json({
      data: {
        user: { id: user_id, firstName: first_name, lastName: last_name },
      },
    });
    return res.sendStatus(400);
  } catch (err) {
    console.log(err);
  }
}

module.exports = userProfile;
