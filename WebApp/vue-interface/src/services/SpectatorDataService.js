import http from "../http-common";

class SpectatorDataService {
  getAll() {
    return http.get("/spectator/");
  }

  get(id) {
    return http.get(`/spectator/${id}`);
  }

  create(data) {
    return http.post("/spectator", data);
  }

  delete(id) {
    return http.delete(`/spectator/${id}`);
  }

  deleteAll() {
    return http.delete(`/spectator/`);
  }

  getByGenre(genre){
    return http.get(`/spectator/gender?spectator_civ=${genre}`);
  }

  getByAge(min,max){
    return http.get(`/spectator/age?min=${min}&max=${max}`);
  }


}

export default new SpectatorDataService();