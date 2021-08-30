import axios from "axios";

const urlBase = "http://localhost:8080/usuario-accion";

class UsuarioAccionService {
  getAll = async (usuario) => {
    const { data } = await axios.get(`${urlBase}/usuario/${usuario}`);

    return data;
  };
  add = async (payload) => {
    await axios.post(`${urlBase}/add`, payload);
  };

  remove = async (payload) => {
    await axios.post(`${urlBase}/remove`, payload);
  };
}

const instance = new UsuarioAccionService();
export default instance;
