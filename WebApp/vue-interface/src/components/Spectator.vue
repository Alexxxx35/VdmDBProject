<template>

<div>
    Filters
        <button class="m-3 btn btn-sm btn-danger smallButton" @click="getSpectatorByGender('Monsieur')">
        Male
      </button>
      <button class="m-3 btn btn-sm btn-danger smallButton" @click="getSpectatorByGender('Madame')">
        Female
      </button>
      <button class="m-3 btn btn-sm btn-danger smallButton" @click="retrieveSpectators">
        All
      </button>
      Count : {{Math.floor(countFilter/totalNumber*100)}} %

      <br>
      Minimum age : <input type="number" v-model="minimumAgeFilter"/>
      Maximum age : <input type="number" v-model="maximumAgeFilter"/>
      <button class="m-3 btn btn-sm btn-danger" @click="filterByAge"> confirm </button>
</div>
  <div class="list row">
    <div class="col-md-6">  
      <h4>Spectator List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(spectator, index) in spectators"
          :key="index"
          @click="setActiveSpectator(spectator, index)"
        >
          {{ spectator.spectator_fname  }} {{ spectator.spectator_lname  }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllSpectators">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentSpectator">
        <h4>Spectator</h4>
        <div>
          <label><strong>First name:</strong></label> {{ currentSpectator.spectator_fname }}
        </div>
        <div>
          <label><strong>Last name:</strong></label> {{ currentSpectator.spectator_lname }}
        </div>
        <div>
          <label><strong>Age:</strong></label> {{ currentSpectator.spectator_age }}
        </div>
        <div>
          <button class="m-3 btn btn-sm btn-danger" @click="removeSpectator">
        Remove
      </button>
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a spectator...</p>
      </div>
    </div>
  </div>
</template>

<script>
import SpectatorDataService from "../services/SpectatorDataService";

export default {
  name: "spectator-list",
  data() {
    return {
      spectators: [],
      currentSpectator: null,
      currentIndex: -1,
      totalNumber: null,
      countFilter : null,
      minimumAgeFilter : 0,
      maximumAgeFilter : 120
    };
  },
  methods: {
    async retrieveSpectators() {
      SpectatorDataService.getAll()
        .then(response => {
          this.spectators = response.data;
        this.totalNumber= response.data.length;
        this.countFilter= this.totalNumber;
          //console.log(response.data.length);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSpectators();
      this.currentSpectator = null;
      this.currentIndex = -1;
    },

    setActiveSpectator(spectator, index) {
      this.currentSpectator = spectator;
      this.currentIndex = spectator ? index : -1;
    },

    removeAllSpectators() {
      SpectatorDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    removeSpectator() {
      SpectatorDataService.delete(this.currentSpectator.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });


    },
    getSpectatorByGender(gender) {
        //this.totalNumber= this.spectators.length;
      SpectatorDataService.getByGenre(gender)
        .then(response => {
          console.log(response.data);
          this.spectators= response.data.Rows;
          this.countFilter = response.data.Count;

          //this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });

        
    },
    filterByAge(){
        SpectatorDataService.getByAge(this.minimumAgeFilter,this.maximumAgeFilter)
        .then(response => {
          console.log(response.data);
          this.spectators= response.data.spectators;
          //this.spectators= response.data.Rows;
          //this.countFilter = response.data.Count;

          //this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveSpectators();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.smallButton{
    width: 60px;
    height: 40px;
}
</style>