const db = require("../../config/db");

class Tokens {
  constructor(userToken, user_id) {
    this.userToken = userToken;
    this.user_id = user_id;
  }
  addToken() {
    let sql = `INSERT INTO tokens(
            users_user_id,
            user_token)
            VALUES (
                '${this.user_id}',
                '${this.userToken}')`;
    return db.execute(sql);
  }

  static getToken(user_id) { 
    let sql = `SELECT * FROM tokens 
    WHERE users_user_id = '${user_id}'`;
    return db.execute(sql);
  }
  static confirmToken(token) {
    let sql = `SELECT * FROM tokens 
    WHERE user_token = '${token}'`;
    return db.execute(sql);
  }

  static deleteToken(token) {
    let sql = `DELETE FROM tokens 
    WHERE user_token = '${token}'`;
    return db.execute(sql);
  }
}

module.exports = Tokens;
