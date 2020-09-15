import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/user`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/user-create`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/user/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/user/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  registerPassword(data: object) {
    return AXIOS.post(
      `${Prefix.api}/user-register-password`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/user/${id}`, { headers: headers() });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/user-search?term=${term}`, { headers: headers() });
  },
};

export default API;
