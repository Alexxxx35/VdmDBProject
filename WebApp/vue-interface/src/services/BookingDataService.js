import http from "../http-common";

class BookingDataService {
  getAll() {
    return http.get("/booking/");
  }

  get(id) {
    return http.get(`/booking/${id}`);
  }

  create(data) {
    return http.post("/booking", data);
  }

  delete(id) {
    return http.delete(`/booking/${id}`);
  }

  deleteAll() {
    return http.delete(`/booking/`);
  }
  getByVr(vr){
    return http.get(`/booking/vr?vr=${vr}`)
  }
  getByHoraire(date,tmp){
    return http.get(`/booking/time/?game_day=${date}&game_timestamp=${tmp}`)
  }


}

export default new BookingDataService();