const express = require("express");

const {
  addAccion,
  removeAccion,
  getAccionesByUsuario,
} = require("../repository/usuarioAccion");

const routes = express.Router();

routes.get("/usuario-accion/usuario/:usuario", async (req, res) => {
  try {
    const { usuario } = req.params;

    const acciones = await getAccionesByUsuario(usuario);

    return res.status(200).json({
      ok: true,
      res: acciones,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

routes.post("/usuario-accion/add", async (req, res) => {
  try {
    const { body } = req;

    if (!body.usuario || !body.accion) {
      return res.status(400).json({
        ok: false,
        err: "Usuario o Acción incorrectos.",
      });
    }

    await addAccion(body.usuario, body.accion);

    return res.status(200).json(null);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

routes.post("/usuario-accion/remove", async (req, res) => {
  try {
    const { body } = req;

    if (!body.usuario || !body.accion) {
      return res.status(400).json({
        ok: false,
        err: "Usuario o Acción incorrectos.",
      });
    }

    await removeAccion(body.usuario, body.accion);

    return res.status(200).json(null);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = routes;
