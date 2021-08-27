const DB = require("../database");

module.exports.getUsuarioByMail = async (mail) => {
  const db = new DB();

  const sql = `
        SELECT *
        FROM usuario
        WHERE mail = ${db.pool.escape(mail)}`;

  const row = await db.doQuery(sql);

  return row[0];
};
