import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import {
  AccountCircleRounded,
  VpnKeyRounded,
  ExitToAppRounded,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import authService from "../../services/authService";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "#EEE",
  },
  loginForm: {
    border: "2px solid dodgerblue",
    borderRadius: 15,
    padding: "1em",
    backgroundColor: "#FFF",
  },
  divider: {
    margin: "0.5em",
  },
  inputs: {
    paddingTop: "1em",
  },
  button: {
    marginTop: "0.5em",
    backgroundColor: "green",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [clave, setClave] = useState("");

  const [errorLogin, setErrorLogin] = useState("");

  const submitLogin = async () => {
    const resp = await authService.login({ mail, clave });

    if (resp.ok) {
      setErrorLogin("");
      history.push("/mis-acciones");
    } else {
      setErrorLogin(resp.err);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={8} sm={6} lg={4} className={classes.loginForm}>
        <Typography variant="h5" align="center">
          Bienvenido al sistema de acciones
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle1">
          Complete sus datos para ingresar.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          className={classes.inputs}
        >
          <Grid item xs={12} sm={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="usuario">Usuario</InputLabel>
              <Input
                id="usuario"
                type="text"
                value={mail}
                onChange={(e) => setMail(e?.target?.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleRounded />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="clave">Clave</InputLabel>
              <Input
                id="clave"
                type="password"
                value={clave}
                onChange={(e) => setClave(e?.target?.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <VpnKeyRounded />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          {errorLogin && (
            <Grid item xs={12} sm={12} lg={12} style={{ marginTop: "0.5em" }}>
              <Alert severity="error">{errorLogin}</Alert>
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ExitToAppRounded />}
              onClick={submitLogin}
              disabled={!mail || !clave}
            >
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
