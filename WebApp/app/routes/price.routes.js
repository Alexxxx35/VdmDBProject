module.exports = app => {
    const price = require("../controllers/price.controller.js");

    var router = require("express").Router();

    // Retrieve all Prices
    router.get("/", price.findAll);

    // Retrieve a single Price with id
    router.get("/:id", price.findOne);

    // Update a Price with id
    router.put("/:id", price.update);


    app.use('/api/price', router);
};