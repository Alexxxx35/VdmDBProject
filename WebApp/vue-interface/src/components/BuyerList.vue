<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by last name"
          v-model="lname"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchLastName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">  
      <h4>Buyer List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(buyer, index) in buyers"
          :key="index"
          @click="setActiveBuyer(buyer, index)"
        >
          {{ buyer.buyer_email }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBuyers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBuyer">
        <h4>Buyer</h4>
        <div>
          <label><strong>First name:</strong></label> {{ currentBuyer.buyer_fname }}
        </div>
        <div>
          <label><strong>Last name:</strong></label> {{ currentBuyer.buyer_lname }}
        </div>
        <div>
          <button class="m-3 btn btn-sm btn-danger" @click="removeBuyer">
        Remove
      </button>
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a buyer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BuyerDataService from "../services/BuyerDataService";

export default {
  name: "buyer-list",
  data() {
    return {
      buyers: [],
      currentBuyer: null,
      currentIndex: -1,
      lname: ""
    };
  },
  methods: {
    retrieveBuyers() {
      BuyerDataService.getAll()
        .then(response => {
          this.buyers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBuyers();
      this.currentBuyer = null;
      this.currentIndex = -1;
    },

    setActiveBuyer(buyer, index) {
      this.currentBuyer = buyer;
      this.currentIndex = buyer ? index : -1;
    },

    removeAllBuyers() {
      BuyerDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    removeBuyer() {
      BuyerDataService.delete(this.currentBuyer.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchLastName() {
      BuyerDataService.getBylname(this.lname)
        .then(response => {
            if( Array.isArray( response.data)){
              this.buyers = response.data;
          }
          else{
                this.buyers=[];
                this.buyers.push(response.data)
          }
          this.setActiveBuyer(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveBuyers();
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