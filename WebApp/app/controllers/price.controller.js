const db = require("../models");
const Price = db.price


// Retrieve all Prices from the database.
exports.findAll = (req, res) => {
    Price.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Prices."
            });
        });
};

// Find a single Price with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Price.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Price with id=${id}`
        });
    });
};

// Update a Price by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Price.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Price ${id} was updated successfully.`
            });
        } else {
            res.send({
                message: `Cannot update Price with id=${id}. Maybe Price was not found or req.body is empty!`
            });
        }
    }).catch(err => res.status(500).send({
        message: `Error updating Price with id=${id}`
    }))
};

