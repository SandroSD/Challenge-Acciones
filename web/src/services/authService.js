import axios from "axios";
import { setToLocalStorage } from "../commons/Storage/LocalStorage";

const urlBase = "http://localhost:8080";

class AuthService {
  login = async (payload) => {
    try {
      const { data } = await axios.post(`${urlBase}/public/login`, payload);

      setToLocalStorage("sesion", JSON.stringify(data.res));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.res.token}`;

      return data;
    } catch (err) {
      return err?.response?.data;
    }
  };
}

const instance = new AuthService();
export default instance;
