import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/buyers",
    alias: "/buyers",
    name: "buyers",
    component: () => import("./components/BuyerList")
  },
  {
    path: "/",
    alias: "/",
    name: "accueil",
    component: () => import("./components/Accueil")
  },
  {
    path: "/spectators",
    alias: "/spectators",
    name: "spectators",
    component: () => import("./components/Spectator")
  },
  {
    path: "/games",
    alias: "/games",
    name: "games",
    component: () => import("./components/Game")
  },
  {
    path: "/prices",
    alias: "/prices",
    name: "prices",
    component: () => import("./components/Price")
  },
  {
    path: "/bookings",
    alias: "/bookings",
    name: "bookings",
    component: () => import("./components/Booking")
  },
  {
    path: "/reservation",
    alias: "/reservation",
    name: "reservation",
    component: () => import("./components/Reservation")
  },





  /*{
    path: "/buyer/:id",
    name: "buyer",
    component: () => import("./components/Buyer")
  },*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;