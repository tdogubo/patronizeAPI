const db = require("../../config/db");
const uuid = require("uuid");

class User {
  constructor(email, password, firstName, lastName) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  createUser() {
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

    return db.execute(sql);
  }
  static findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email= '${email}'`;
    return db.execute(sql);
  }
}

module.exports = User;
