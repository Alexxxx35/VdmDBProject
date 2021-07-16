const { sequelize } = require("../models");
const db = require("../models");
const Booking = db.booking

// Create and Save a new Booking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.game_id || !req.body.buyer_id || !req.body.spectator_id || !req.body.booking_price) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Booking
    const booking = {
        game_id: req.body.game_id,
        buyer_id: req.body.buyer_id,
        spectator_id: req.body.spectator_id,
        booking_price: req.body.booking_price,

    };

    // Save Booking in the database
    Booking.create(booking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Booking."
            });
        });
};

// Retrieve all Bookings from the database.
exports.findAll = (req, res) => {
    Booking.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Bookings."
            });
        });
};

// Find a single Booking with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Booking.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Booking with id=${id}`
        });
    });
};

// Update a Booking by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Booking.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Booking ${id} was updated successfully.`
            });
        } else {
            res.send({
                message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
            });
        }
    }).catch(err => res.status(500).send({
        message: `Error updating Booking with id=${id}`
    }))
};

// Delete a Booking with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Booking.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Booking ${id} was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete Booking with id=${id}. Maybe Booking was not found or req.body is empty!!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Booking with id=${id}`
        });
    });
};

// Delete all Bookings from the database.
exports.deleteAll = (req, res) => {
    Booking.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Bookings were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all bookings."
            });
        });
};

// Count all bookings per price
exports.countFullPrice = (req, res) => {
    Booking.count({
        where: {
            booking_price: "Plein tarif"
        }
    }).then(data => {
        console.log(data);
        res.send({ "number of full prices": data });
    }).catch(err => {
        console.log(err);
        res.status(404).send({
            message: "Could not display prices"
        });
    });
};

// Count all bookings per price
exports.countReducedPrice = (req, res) => {
    Booking.count({
        where: {
            booking_price: "Tarif réduit"
        }
    }).then(data => {
        res.send({ "number of reduced prices": data });
    }).catch(err => {
        res.status(404).send({
            message: "Could not display prices"
        });
    });
};

// Count all bookings per price
exports.countStudentPrice = (req, res) => {
    Booking.count({
        where: {
            booking_price: "Etudiant"
        }
    }).then(data => {
        res.send({ "number of student prices": data });
    }).catch(err => {
        res.status(404).send({
            message: "Could not display prices"
        });
    });
};

// Count all bookings per price
exports.countSeniorPrice = (req, res) => {
    Booking.count({
        where: {
            booking_price: "Senior"
        }
    }).then(data => {
        res.send({ "number of senior prices": data });
    }).catch(err => {
        res.status(404).send({
            message: "Could not display prices"
        });
    });
};

// Count all bookings per price
exports.filterPerPrice = (req, res) => {
    const booking_price = req.query.booking_price;
    Booking.findAndCountAll({
        where: {
            booking_price: booking_price
        }
    }).then(data => {
        res.send({
            "number of reservation with price": data.count,
            "reservation with price": data.rows
        });
    }).catch(err => {
        res.status(404).send({
            message: "Could not display prices"
        });
    });
};

exports.getAllVrPerReservation = (req, res) => {
    const vr = req.query.vr;
    db.sequelize.query("select * from booking inner join game on booking.game_id=game.id and game.game_vr = (:bool)", {
        replacements: { bool: vr },
        type: db.Sequelize.QueryTypes.SELECT
    }).then(result => {
        return res.status(200).send({ result })
    }).catch(err => {
        res.status(404).send({
            message: "Could not display all vr and no vr games per reservation"
        });
    });

}

exports.getAllReservationPerDayAndTimestamp = (req, res) => {
    const game_timestamp = req.query.game_timestamp;
    const game_day = req.query.game_day;
    db.sequelize.query("select * from booking inner join game on booking.game_id=game.id and game.game_day = (:day) and game.game_timestamp = (:timestamp);", {
        replacements: {
            day: game_day,
            timestamp: game_timestamp
        },
        type: db.Sequelize.QueryTypes.SELECT
    }).then(result => {
        return res.status(200).send({ result })
    }).catch(err => {
        res.status(404).send({
            message: "Could not display all reservations per date and timestamp"
        });
    });
}


// exports.findClientsPerVersion = (req,res) => {
//     const game_id = req.
//     Booking.findAndCountAll
// }