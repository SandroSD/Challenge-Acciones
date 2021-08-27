require("dotenv").config();

const mysql = require("mysql2");

const { HOST, USER, PASSWORD, DATABASE } = process.env;

class Database {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 20,
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });
  }

  doQuery(queryString) {
    return new Promise((resolve, reject) => {
      return this.pool.getConnection((err, conn) => {
        if (err) throw err;

        return conn.query(queryString, (err, rows) => {
          if (err) return reject(err);

          conn.release();

          return resolve(rows);
        });
      });
    });
  }
}

module.exports = Database;
