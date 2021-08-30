import axios from "axios";

const baseUrl = "https://api.twelvedata.com";

const key = "711c7a91a5d549c09a93ff533073ea54";

class AccionService {
  select = async () => {
    const {
      data: { data },
    } = await axios.get(`${baseUrl}/stocks?source=docs&exchange=NYSE`);

    return data;
  };

  getBySymbol = async (symbol) => {
    const { data } = await axios.get(
      `${baseUrl}/stocks?symbol=${symbol}&source=docs`
    );

    return data;
  };

  getData = async (symbol, interval, start_date, end_date) => {
    let completeUrl =
      baseUrl + `/time_series?symbol=${symbol}&interval=${interval}`;

    if (start_date) {
      completeUrl += `&start_date=${start_date}`;
    }

    if (end_date) {
      completeUrl += `&end_date=${end_date}`;
    }

    completeUrl += `&apikey=${key}`;

    const data = await axios.get(completeUrl);

    return data;
  };
}

const instance = new AccionService();
export default instance;
