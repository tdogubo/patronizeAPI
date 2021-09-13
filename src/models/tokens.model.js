const db = require("../../config/db");

class Tokens {
  constructor(id, token) {
    this.token = token;
  }
  static addToken(id) {
    let sql = `INSERT INTO tokens(
            user_id,
            token)
            VALUES (
                '${id}',
                '${this.token}')`;
    return db.execute(sql);
  }
}

module.exports = Tokens;
