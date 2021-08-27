const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getUsuarioByMail } = require("../repository/usuario");

const routes = express.Router();

routes.post("/public/login", async (req, res) => {
  try {
    const { body } = req;

    if (!body.mail || !body.clave) {
      return res.status(400).json({
        ok: false,
        err: "Mail o Clave incorrectos.",
      });
    }

    const usuario = await getUsuarioByMail(body.mail);

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        err: "Mail o Clave incorrectos.",
      });
    }

    const claveValida = await bcrypt.compare(body.clave, usuario.clave);

    if (!claveValida) {
      return res.status(400).json({
        ok: false,
        err: "Mail o Clave incorrectos.",
      });
    }

    delete usuario.clave;

    const { TOKEN_SECRETO } = process.env;

    const token = jwt.sign({ usuario }, TOKEN_SECRETO, { expiresIn: "24h" });

    return res.status(200).json({
      ok: true,
      res: {
        usuario,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

module.exports = routes;
