module.exports = app => {
    const buyer = require("../controllers/buyer.controller.js");

    var router = require("express").Router();

    // Create a new Buyer
    router.post("/", buyer.create);

    // Retrieve all Buyers
    router.get("/", buyer.findAll);

    // Retrieve a single Buyer with his firstname and lastname
    router.get("/get/", buyer.findByFirstNameAndLastName);

    // Retrieve a single Buyer with id
    router.get("/:id", buyer.findOne);

    // Update a Buyer with his firstname and lastname
    router.put("/update/", buyer.update);

    // Delete a Buyer with id
    router.delete("/delete/", buyer.delete);

    // Delete all Buyers
    router.delete("/", buyer.deleteAll);



    app.use('/api/buyer', router);
};