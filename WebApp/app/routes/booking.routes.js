module.exports = app => {
    const booking = require("../controllers/booking.controller.js");

    var router = require("express").Router();

    // Create a new Booking
    router.post("/", booking.create);

    // Retrieve all Bookings
    router.get("/", booking.findAll);

    // Retrieve full price booking  OLD
    router.get("/prices/fullprice", booking.countFullPrice);

    // Retrieve reduced price booking  OLD
    router.get("/prices/reducedprice", booking.countReducedPrice);

    // Retrieve student price booking  OLD
    router.get("/prices/studentprice", booking.countStudentPrice);

    // Retrieve senior price booking  OLD
    router.get("/prices/seniorprice", booking.countSeniorPrice);

    //Filter booking per price
    router.get("/prices/", booking.filterPerPrice);

    // Retrieve all bookings with vr or no vr games
    router.get("/vr/", booking.getAllVrPerReservation)

    // Retrieve all bookings whose games are at the same date and timestamp
    router.get("/time/", booking.getAllReservationPerDayAndTimestamp)

    // Retrieve a single Booking with id
    router.get("/:id", booking.findOne);

    // Update a Booking with id
    router.put("/:id", booking.update);

    // Delete a Booking with id
    router.delete("/:id", booking.delete);

    // Delete all Bookings
    router.delete("/", booking.deleteAll);

    app.use('/api/booking', router);
};