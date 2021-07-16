<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">POC</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/buyers" class="nav-link">Buyers</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/spectators" class="nav-link">Spectators</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/games" class="nav-link">Games</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/prices" class="nav-link">Prices</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/bookings" class="nav-link">Bookings</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/reservation" class="nav-link">Reservation</router-link>
        </li>

      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>