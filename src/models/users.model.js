const db = require("../../config/db");
const uuid = require("uuid");

class User {
  constructor(email, password, firstName, lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async createUser() {
    try {
      let id = uuid.v4();
      let sql = `INSERT INTO users(
                user_id, email, password, first_name, last_name
                )
                VALUES(
                    '${id}',
                    '${this.email}',
                    '${this.password}',
                    '${this.firstName}',
                    '${this.lastName}'
                )`;
      const [newUser, _] = await db.execute(sql);
      return newUser;
    } catch (err) {
      return console.log(err);
    }
  }
}

module.exports = User;
