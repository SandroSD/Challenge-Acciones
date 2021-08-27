require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const public = require("./routes/public");

const { verifyToken } = require("./middleware/auth");

const usuarioAccion = require("./routes/usuarioAccion");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use(public);

// app.use(verifyToken);

app.use(usuarioAccion);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
