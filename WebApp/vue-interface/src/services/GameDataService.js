import http from "../http-common";

class GameDataService {
  getAll() {
    return http.get("/game/");
  }

  get(id) {
    return http.get(`/game/${id}`);
  }

  create(data) {
    return http.post("/game", data);
  }

  delete(id) {
    return http.delete(`/game/${id}`);
  }

  deleteAll() {
    return http.delete(`/game/`);
  }


}

export default new GameDataService();