<template>
  <div class="list row">
    <div class="col-md-6">  
      <h4>Price List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(price, index) in prices"
          :key="index"
          @click="setActivePrice(price, index)"
        >
          {{ price.price_type  }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPrices">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPrice">
        <h4>Price</h4>
        <div>
          <label><strong>Price type:</strong></label> {{ currentPrice.price_type }}
        </div>
        <div>
          <label><strong>Price Value:</strong></label> {{ currentPrice.price_value }}
        </div>
        <div>
          <button class="m-3 btn btn-sm btn-danger" @click="removePrice">
        Remove
      </button>
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a price...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PriceDataService from "../services/PriceDataService";

export default {
  name: "price-list",
  data() {
    return {
      prices: [],
      currentPrice: null,
      currentIndex: -1
    };
  },
  methods: {
    retrievePrices() {
      PriceDataService.getAll()
        .then(response => {
          this.prices = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePrices();
      this.currentPrice = null;
      this.currentIndex = -1;
    },

    setActivePrice(price, index) {
      this.currentPrice = price;
      this.currentIndex = price ? index : -1;
    },

    removeAllPrices() {
      PriceDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    removePrice() {
      PriceDataService.delete(this.currentPrice.id)
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
    this.retrievePrices();
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