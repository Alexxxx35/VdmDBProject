const db = require("../models");
const Buyer = db.buyer

// Create and Save a new Buyer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.buyer_fname || !req.body.buyer_lname || !req.body.buyer_age || !req.body.buyer_email || !req.body.buyer_civ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Buyer
    const buyer = {
        buyer_fname: req.body.buyer_fname,
        buyer_lname: req.body.buyer_lname,
        buyer_age: req.body.buyer_age,
        buyer_email: req.body.buyer_email,
        buyer_civ: req.body.buyer_civ
    };

    // Save Buyer in the database
    Buyer.create(buyer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Buyer."
            });
        });
};

// Retrieve all Buyers from the database.
exports.findAll = (req, res) => {
    Buyer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Buyers."
            });
        });
};

// Find a single Buyer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Buyer.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Buyer with id=${id}`
        });
    });

};

// Update a Buyer identified by the id in the request
exports.update = (req, res) => {
    const buyer_fname = req.query.buyer_fname;
    const buyer_lname = req.query.buyer_lname
    Buyer.update(req.body, {
        where: { buyer_fname: buyer_fname, buyer_lname: buyer_lname }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Buyer ${buyer_fname} ${buyer_lname} was updated successfully.`
            });
        } else {
            res.send({
                message: `Cannot update Buyer with buyer_fname=${buyer_fname} and buyer_lname=${buyer_lname}. Maybe Buyer was not found or req.body is empty!`
            });
        }
    }).catch(err => res.status(500).send({
        message: `Error updating Spectator with buyer_fname=${buyer_fname} and buyer_lname=${buyer_lname}`
    }))
};

// Delete a Buyer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Buyer.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Buyer ${id} was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete Buyer with id=${id}. Maybe Buyer was not found or req.body is empty!!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Tutorial with id=${id}`
        });
    });
};

exports.deleteAll = (req, res) => {
    Buyer.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Buyers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all buyers."
            });
        });
};



exports.findByFirstNameAndLastName = (req, res) => {
    const buyer_fname = req.query.buyer_fname;
    const buyer_lname = req.query.buyer_lname
    Buyer.findAll({
        where: {
            buyer_fname: buyer_fname,
            buyer_lname: buyer_lname,
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Buyer with buyer_fname=${buyer_fname} and buyer_lname=${buyer_lname}` + err
        });
    });

};