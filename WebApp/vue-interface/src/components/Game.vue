<template>
  <div class="list row">
    <div class="col-md-6">  
      <h4>Game List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(game, index) in games"
          :key="index"
          @click="setActiveGame(game, index)"
        >
          {{ game.game_name  }}  <br>
          {{ game.game_day  }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllGames">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentGame">
        <h4>Game</h4>
        <div>
          <label><strong>Game name:</strong></label> {{ currentGame.game_name }}
        </div>
        <div>
          <label><strong>Date:</strong></label> {{ currentGame.game_day }}
        </div>
        <div>
          <label><strong>Horaire:</strong></label> {{ ~~(currentGame.game_timestamp/60) }}:{{ currentGame.game_timestamp%60 }}
        </div>
        <div>
          <label><strong>VR:</strong></label> {{ currentGame.game_vr }}
        </div>
        <div>
          <button class="m-3 btn btn-sm btn-danger" @click="removeGame">
        Remove
      </button>
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a game...</p>
      </div>
    </div>
  </div>
</template>

<script>
import GameDataService from "../services/GameDataService";

export default {
  name: "game-list",
  data() {
    return {
      games: [],
      currentGame: null,
      currentIndex: -1
    };
  },
  methods: {
    retrieveGames() {
      GameDataService.getAll()
        .then(response => {
          this.games = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveGames();
      this.currentGame = null;
      this.currentIndex = -1;
    },

    setActiveGame(game, index) {
      this.currentGame = game;
      this.currentIndex = game ? index : -1;
    },

    removeAllGames() {
      GameDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    removeGame() {
      GameDataService.delete(this.currentGame.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  },
  mounted() {
    this.retrieveGames();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>