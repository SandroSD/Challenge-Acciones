import React, { useEffect } from "react";
import { Switch, Route, HashRouter, useHistory } from "react-router-dom";

import Login from "./components/Login/Login";
import MisAcciones from "./components/MisAcciones/MisAcciones";
import Accion from "./components/Accion/Accion";
import { getFromLocalStorage } from "./commons/Storage/LocalStorage";

// comentario
function App() {
  const history = useHistory();

  useEffect(() => {
    const sesion = JSON.parse(getFromLocalStorage("sesion"));

    if (!sesion?.token) {
      history.push("/");
    }
  }, [history]);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path={"/mis-acciones"}>
          <MisAcciones />
        </Route>
        <Route path={"/mis-acciones/:id"}>
          <Accion />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
