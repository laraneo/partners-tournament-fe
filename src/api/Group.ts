import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const API = {
  getAll(data: number, perPage: number) {
    const page = data ? data : 1;
    return AXIOS.get(`${Prefix.api}/group`, {
      params: {
        page,
        perPage
      },
      headers: headers()
    });
  },
  getList() {
    return AXIOS.get(`${Prefix.api}/group-list`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/group`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/group/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/group/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/group/${id}`, { headers: headers() });
  },
  search(term: string, perPage: number) {
    return AXIOS.get(`${Prefix.api}/group-search`, {
      params: {
        term,
        perPage
      },
      headers: headers()
    });
  }
};

export default API;
