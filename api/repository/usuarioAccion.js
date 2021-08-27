const DB = require("../database/index");

module.exports.addAccion = async (usuario, accion) => {
  const db = new DB();

  const sql = `
        INSERT INTO usuario_accion (usuario, accion)
            VALUES (${db.pool.escape(usuario)}, ${db.pool.escape(accion)})
    `;

  await db.doQuery(sql);

  return;
};

module.exports.removeAccion = async (usuario, accion) => {
  const db = new DB();

  const sql = `
        DELETE FROM usuario_accion WHERE usuario = ${db.pool.escape(
          usuario
        )} and accion = ${db.pool.escape(accion)}
      `;

  await db.doQuery(sql);

  return;
};

module.exports.getAccionesByUsuario = async (usuario) => {
  const db = new DB();

  const sql = `
      SELECT GROUP_CONCAT('',accion) acciones
        FROM usuario_accion
          WHERE usuario = ${db.pool.escape(usuario)}
          GROUP BY usuario
    `;

  const acciones = await db.doQuery(sql);

  return acciones[0];
};
