import React, { useState, useEffect } from "react";

import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Autocomplete, Alert } from "@material-ui/lab";
import { Menu, DeleteForeverOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../commons/CustomTable/CustomTable";

import accionInstance from "../../services/accionService";
import usuarioAccionServiceInstance from "../../services/usuarioAccionService";

import { getFromLocalStorage } from "../../commons/Storage/LocalStorage";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  acciones: {
    padding: "1em",
  },
  removeBtn: {
    color: "red",
    fontSize: "1.2em",
  },
}));

const MisAcciones = () => {
  const classes = useStyles();
  const [accionesSelect, setAccionesSelect] = useState([]);
  const [misAcciones, setMisAcciones] = useState([]);
  const [accionElegida, setAccionElegida] = useState("");

  const [sesion, setSesion] = useState("");
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = JSON.parse(getFromLocalStorage("sesion"));
      setSesion(data.usuario);

      const [accionesSelectData, misAccionesData] = await Promise.all([
        accionInstance.select(),
        usuarioAccionServiceInstance.getAll(data.usuario.id),
      ]);

      setMisAcciones(misAccionesData?.res?.acciones.split(",") || []);
      setAccionesSelect(accionesSelectData);
    };

    try {
      loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadData(true);
    }
  }, []);

  const addSimboloClick = async () => {
    setMisAcciones([...misAcciones.concat(accionElegida)]);

    await usuarioAccionServiceInstance.add({
      usuario: sesion.id,
      accion: accionElegida,
    });
  };

  const deleteAccion = async (symbol) => {
    const nuevasAcciones = misAcciones.filter((a) => a !== symbol);
    setMisAcciones(nuevasAcciones);
    await usuarioAccionServiceInstance.remove({
      usuario: sesion.id,
      accion: symbol,
    });
  };

  const changeAutocomplete = (e, val) => {
    setAccionElegida(val?.symbol);
  };

  if (!loadData) return null;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.container}
    >
      <Grid item xs={12} sm={12} lg={12}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Mis Acciones
            </Typography>
            <Button color="inherit">{`Usuario: ${sesion.nombre}`}</Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={5}
          className={classes.acciones}
        >
          <Grid item xs={3} sm={3} lg={3}>
            <Autocomplete
              size="small"
              options={accionesSelect}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Acciones" variant="outlined" />
              )}
              onChange={changeAutocomplete}
            />
          </Grid>
          <Grid item xs={9} sm={9} lg={9}>
            <Button
              variant="contained"
              color="primary"
              onClick={addSimboloClick}
              disabled={!accionElegida}
            >
              Agregar Símbolo
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            {misAcciones && misAcciones.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Símbolo</StyledTableCell>
                      <StyledTableCell>Nombre</StyledTableCell>
                      <StyledTableCell>Moneda</StyledTableCell>
                      <StyledTableCell
                        style={{ width: "5%" }}
                      ></StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {accionesSelect &&
                      misAcciones &&
                      misAcciones.map((a, i) => {
                        const accion = accionesSelect.find(
                          (acc) => acc.symbol === a
                        );
                        return (
                          <StyledTableRow key={i}>
                            <StyledTableCell>
                              <Link to={`/mis-acciones/${accion?.symbol}`}>
                                {accion?.symbol}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell>{accion?.name}</StyledTableCell>
                            <StyledTableCell>
                              {accion?.currency}
                            </StyledTableCell>
                            <StyledTableCell style={{ width: "5%" }}>
                              <IconButton
                                style={{ margin: 0, padding: 3 }}
                                onClick={() => deleteAccion(accion?.symbol)}
                              >
                                <DeleteForeverOutlined
                                  className={classes.removeBtn}
                                />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">
                El usuario no tiene acciones registradas.
              </Alert>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MisAcciones;
