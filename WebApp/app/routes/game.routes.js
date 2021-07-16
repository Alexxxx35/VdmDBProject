module.exports = app => {
    const game = require("../controllers/game.controller.js");

    var router = require("express").Router();
    // Create a new Game
    router.post("/", game.create);

    //test road
    router.post("/test", game.findAndCreate);

    // Retrieve all Games
    router.get("/", game.findAll);

    // Retrieve all Games according to their vr status (t or f)
    router.get("/vr/", game.findIfVr);

    // Retrieve a single Game with id
    router.get("/:id", game.findOne);

    // Retrieve a single Game with his name
    router.get("/get/", game.findByGameName)

    // Update a Game with id
    router.put("/update/", game.update);

    // Delete a Game with id
    router.delete("/:id", game.delete);

    // Delete all Games
    router.delete("/", game.deleteAll);



    app.use('/api/game', router);
};