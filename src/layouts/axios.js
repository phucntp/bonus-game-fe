import axios from "axios";

const baseUrl = "http://103.147.34.54:9090/api/";
class ApiClient {
  constructor() {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(async (config) => {
      const userLogin = sessionStorage.getItem("userLogin");
      if (userLogin && JSON.parse(userLogin)?.accessToken) {
        config.headers.Authorization = `Bearer ${JSON.parse(userLogin)?.accessToken}`;
      }
      return config;
    });
  }

  post(url, { data }, config) {
    return this.api.post(url, data, config);
  }

  get(url) {
    return this.api.get(url);
  }

  put(url, { data }) {
    return this.api.put(url, data);
  }

  delete(url) {
    return this.api.delete(url);
  }
}

const api = new ApiClient();
export default api;
