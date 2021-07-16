<template>
  <div class="submit-form">
    <div v-if="!submitted">
        <div class="form-group">
            <label for="buyer"> <strong> Buyer </strong></label>
            <br>
            First name :<input
            type="text"
            class="form-control"
            id="buyer_fname"
            required
            v-model="this.buyer.buyer_fname"
            name="fname"
            />
            Last name :<input
            type="text"
            class="form-control"
            id="buyer_lname"
            required
            v-model="this.buyer.buyer_lname"
            name="lname"
            />
            Age :<input
            type="number"
            class="form-control"
            id="buyer_age"
            required
            v-model="this.buyer.buyer_age"
            name="age"
            />
            Email :<input
            type="email"
            class="form-control"
            id="buyer_email"
            required
            v-model="this.buyer.buyer_email"
            name="email"
            />
            <div>
            <input type="radio" id="male" name="gender" value="Monsieur"
                    checked>
            <label for="male">Monsieur</label>
            </div>
            
            <div>
            <input type="radio" id="female" name="gender" value="Madame">
            <label for="female">Madame</label>
            </div>
            

            <br>
            <div class="form-group">
            <label for="buyer"> <strong> Spectator </strong></label>
            <br>
            
             <button @click="addSpectator" class="btn btn-success">Add spectator</button>
            <div v-for ="(spectator, counter) in spectators" v-bind:key="counter">
            First name :<input
            type="text"
            class="form-control"
            id="spectator_fname"
            required
            v-model="spectator.spectator_fname"
            name="fname"
            />
            Last name :<input
            type="text"
            class="form-control"
            id="spectator_lname"
            required
            v-model="spectator.spectator_lname"
            name="lname"
            />
            Age :<input
            type="number"
            class="form-control"
            id="spectator_age"
            required
            v-model="spectator.spectator_age"
            name="age"
            />
            <div>
            <input type="radio" id="male" name="gender" value="Monsieur" v-model="spectator.spectator_civ" checked>
            <label for="male">Monsieur</label>
            </div>

            <div>
            <input type="radio" id="female" name="gender" value="Madame" v-model="spectator.spectator_civ">
            <label for="female">Madame</label>
            </div>

            </div>
        </div>
        </div>
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
//import BookingDataService from "../services/BookingDataService";
import BuyerDataService from "../services/BuyerDataService";
//import GameDataService from "../services/GameDataService";
//import SpectatorDataService from "../services/SpectatorDataService";



export default {
  name: "add-reservation",
  data() {
    return {
        number_spectators: 1,
      buyer: {
        buyer_fname: "",
        buyer_lname: "",
        buyer_age: undefined,
        buyer_email:"",
        buyer_civ:""
      },
      spectators:[
          {
              spectator_fname:"",
              spectator_lname:"",
              spectator_age: undefined,
              spectators_civ:""
          }
      ],
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };

      BuyerDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },
    addSpectator(){
        this.spectators.push(
            {
              spectator_fname:"",
              spectator_lname:"",
              spectator_age: undefined,
              spectators_civ:""
            }
        )
        
    }
  },
  watch:{
      number_spectators(){
          this.$forceUpdate();
      }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>