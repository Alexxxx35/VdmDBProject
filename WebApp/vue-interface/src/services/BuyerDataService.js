import http from "../http-common";

class BuyerDataService {
  getAll() {
    return http.get("/buyer/");
  }

  get(id) {
    return http.get(`/buyer/${id}`);
  }

  create(data) {
    return http.post("/buyer", data);
  }

  /*update(id, data) {
    return http.put(`/buyer/${id}`, data);
  }*/

  delete(id) {
    return http.delete(`/buyer/${id}`);
  }

  deleteAll() {
    return http.delete(`/buyer/`);
  }

  getBylname(lname){
    return http.get(`/buyer/lname?buyer_lname=${lname}`);
  }

}

export default new BuyerDataService();