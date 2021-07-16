const db = require("../models");
const Spectator = db.spectator
const Op = db.Sequelize.Op;

// Create and Save a new Spectator
exports.create = (req, res) => {
    // Validate request
    if (!req.body.spectator_fname || !req.body.spectator_lname || !req.body.spectator_age || !req.body.spectator_civ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Spectator
    const spectator = {
        spectator_fname: req.body.spectator_fname,
        spectator_lname: req.body.spectator_lname,
        spectator_age: req.body.spectator_age,
        spectator_civ: req.body.spectator_civ
    };

    // Save Spectator in the database
    Spectator.create(spectator)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Spectator."
            });
        });
};
// exports.findOrCreate = (req, res) => {
//     // Validate request
//     if (!req.body.spectator_fname || !req.body.spectator_lname || !req.body.spectator_age || !req.body.spectator_civ) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
//     // Create a Spectator
//     const spectator = {
//         spectator_fname: req.body.spectator_fname,
//         spectator_lname: req.body.spectator_lname,
//         spectator_age: req.body.spectator_age,
//         spectator_civ: req.body.spectator_civ
//     };
//     Spectator.findOrCreate({ where: { spectator_fname: req.body.spectator_fname, spectator_lname: req.body.spectator_lname }, defaults: { spectator } })
//         .then(function(spectator, created) {

//             console.log(spectator.values);
//             res.send(200);
//         }).error(function(err) {
//             console.log('Error occured' + err);
//         })
// }

// Retrieve all Spectators from the database.
exports.findAll = (req, res) => {
    Spectator.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Spectators."
            });
        });
};


// Find a single Spectator with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Spectator.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Spectator with id=${id}`
        });
    });
};

// Find a single Spectator with his firstname and lastname
exports.findByFirstNameAndLastName = (req, res) => {
    const spectator_fname = req.query.spectator_fname;
    const spectator_lname = req.query.spectator_lname;
    Spectator.findAll({
        where: {
            spectator_fname: spectator_fname,
            spectator_lname: spectator_lname,
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Spectator with spactator_fname=${spactator_fname} and spactator_lname=${spactator_lname}` + err
        });
    });

};

// Update a Spectator identified by the id in the request
exports.update = (req, res) => {
    const spectator_fname = req.query.spectator_fname;
    const spectator_lname = req.query.spectator_lname
    Spectator.update(req.body, {
        where: { spectator_fname: spectator_fname, spectator_lname: spectator_lname }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Spectator ${spectator_fname} ${spectator_lname} was updated successfully.`
            });
        } else {
            res.send({
                message: `Cannot update Spectator with spectator_fname=${spectator_fname} and spectator_lname=${spectator_lname}. Maybe Spectator was not found or req.body is empty!`
            });
        }
    }).catch(err => res.status(500).send({
        message: `Error updating Spectator with spectator_fname=${spectator_fname} and spectator_lname=${spectator_lname}`
    }))
};


// Delete a Spectator with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Spectator.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Spectator ${id} was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete Spectator with id=${id}. Maybe Spectator was not found or req.body is empty!!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Spectator with id=${id}`
        });
    });
};

// Delete all Spectators from the database.
exports.deleteAll = (req, res) => {
    Spectator.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Spectators were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all spectators."
            });
        });
};


exports.findByGenre = (req, res) => {
    const spectator_civ = req.query.spectator_civ;
    Spectator.findAndCountAll({
        where: {
            spectator_civ: spectator_civ
        }
    }).then(data => {
        res.send({ "spectator_civ": spectator_civ, "Count": data.count, "Rows": data.rows });
    }).catch(err => {
        res.status(404).send({
            message: "Error occured"
        });
    });
};

//Filter Spectators by age
exports.filterByAge = (req, res) => {
    const age_minimum = req.query.min;
    const age_maximum = req.query.max;
    Spectator.findAndCountAll({
        where: {
            spectator_age: {
                [Op.and]: {
                    [Op.lte]: age_maximum,
                    [Op.gte]: age_minimum
                }
            }
        }
    }).then(data => {
        res.send({ "Number of spectators": data.count, "spectators": data.rows })
    }).catch(err => {
        res.status(404).send({
            message: `Could not display age of spectators between ${age_minimum} and ${age_maximum}`
        });
    });
};