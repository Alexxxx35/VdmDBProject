<template>
<div>
    Filters
        <button class="m-3 btn btn-sm btn-danger smallButton" @click="getBookingByVr('true')">
        VR
      </button>
      <button class="m-3 btn btn-sm btn-danger smallButton" @click="getBookingByVr('false')">
        Not VR
      </button>
      <button class="m-3 btn btn-sm btn-danger smallButton" @click="retrieveBookings">
        All
      </button>


      <br>
      Date : <input type="date" v-model="date"/>
      Heure : <input type="number" v-model="heure"/>
      Minutes : <input type="number" v-model="minutes"/>
      <button class="m-3 btn btn-sm btn-danger" @click="getBookingByHoraire"> Confirm </button>
      <button class="m-3 btn btn-sm btn-danger" @click="retrieveBookings"> Cancel </button>

</div>
  <div class="list row">
    <div class="col-md-6">  
      <h4>Booking List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(booking, index) in bookings"
          :key="index"
          @click="setActiveBooking(booking, index)"
        >
          {{ booking.createdAt  }}  <br>
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllBookings">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentBooking">
        <h4>Booking</h4>
        <div>
          <label><strong>Buyer id:</strong></label> {{ currentBooking.buyer_id }}
        </div>
        <div>
          <label><strong>Spectator id:</strong></label> {{ currentBooking.spectator_id }}
        </div>
        <div>
          <label><strong>Game id:</strong></label> {{ currentBooking.game_id }}
        </div>
        <div>
          <label><strong>Tarif:</strong></label> {{ currentBooking.booking_price }}
        </div>
        <div>
          <button class="m-3 btn btn-sm btn-danger" @click="removeBooking">
        Remove
      </button>
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a booking...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookingDataService from "../services/BookingDataService";

export default {
  name: "booking-list",
  data() {
    return {
      bookings: [],
      currentBooking: null,
      currentIndex: -1,
      date:null,
      heure:null,
      minutes:null,
    };
  },
  methods: {
    retrieveBookings() {
      BookingDataService.getAll()
        .then(response => {
          this.bookings = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveBookings();
      this.currentBooking = null;
      this.currentIndex = -1;
    },

    setActiveBooking(booking, index) {
      this.currentBooking = booking;
      this.currentIndex = booking ? index : -1;
    },

    removeAllBookings() {
      BookingDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    removeBooking() {
      BookingDataService.delete(this.currentBooking.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    getBookingByVr(vr){
        BookingDataService.getByVr(vr)
        .then(response => {
          console.log(response.data);
          this.bookings=response.data.result
          //this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    getBookingByHoraire(){
      
      const a = (parseInt( this.heure)*60 )+ parseInt( this.minutes);
      //console.log(a);
      BookingDataService.getByHoraire(this.date,a)
      .then(response => {
          //console.log(response.data);
          this.bookings=response.data.result
          //this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveBookings();
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
    width: 70 px;
    height: 40px;
}
</style>