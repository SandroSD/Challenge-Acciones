require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        error: "Acceso denegado.",
      });
    }

    const { TOKEN_SECRETO } = process.env;

    token = token.replace("Bearer ", "");

    const { exp } = jwt.verify(token, TOKEN_SECRETO);

    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "El token expiró, por favor vuelva a iniciar sesión.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: "Token no válido.",
    });
  }
};
