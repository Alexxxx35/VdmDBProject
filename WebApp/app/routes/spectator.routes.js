module.exports = app => {
    const spectator = require("../controllers/spectator.controller.js");

    var router = require("express").Router();

    // Create a new Spectator
    router.post("/", spectator.create);

    // Retrieve all Spectator by gender
    router.get("/gender/", spectator.findByGenre);

    // Retrieve a single Spectator with his firstname and lastname
    router.get("/get/", spectator.findByFirstNameAndLastName);

    // Rertrieve all Spectators by age
    router.get("/age/", spectator.filterByAge);

    // Retrieve all Spectators
    router.get("/", spectator.findAll);

    // Retrieve a single Spectator with id
    router.get("/:id", spectator.findOne);

    // Update a Spectator with his firstname and lastname
    router.put("/update/", spectator.update);

    // Delete a Spectator with id
    router.delete("/:id", spectator.delete);

    // Delete a Spectator
    router.delete("/", spectator.deleteAll);

    app.use('/api/spectator', router);
};