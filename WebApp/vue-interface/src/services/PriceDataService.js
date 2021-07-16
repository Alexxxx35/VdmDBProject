import http from "../http-common";

class PriceDataService {
  getAll() {
    return http.get("/price/");
  }

  get(id) {
    return http.get(`/price/${id}`);
  }

  create(data) {
    return http.post("/price", data);
  }

  delete(id) {
    return http.delete(`/price/${id}`);
  }

  deleteAll() {
    return http.delete(`/price/`);
  }


}

export default new PriceDataService();