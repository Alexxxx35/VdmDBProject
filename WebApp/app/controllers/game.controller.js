const db = require("../models");
const Game = db.game

// Create and Save a new Game
exports.create = (req, res) => {
    // Validate request
    if (!req.body.game_name || !req.body.game_timestamp || !req.body.game_day || !req.body.game_vr) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Game
    const game = {
        game_name: req.body.game_name,
        game_timestamp: req.body.game_timestamp,
        game_day: req.body.game_day,
        game_vr: req.body.game_vr
    };

    // Save Game in the database
    Game.create(game)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Game."
            });
        });
};


// Retrieve all Games from the database.
exports.findAll = (req, res) => {
    Game.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Games."
            });
        });
};

// Find a single Game with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Game.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving Game with id=${id}`
        });
    });
};

// Find a single Game with game_name
exports.findByGameName = (req, res) => {
    const game_name = req.query.game_name;
    Game.findAll(game_name).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: `Error retrieving ${game_name} Game`
        });
    });
};

// Create a single Game if not exists
exports.findAndCreate = (req, res) => {
    const game_name = req.body.game_name;
    Game.findOne({
        where: {
            game_name: game_name,
        }
    }).then(data => {
        res.status(409).send({ message: "Conflict Game already exists" });

        // Create a Game
        const game = {
            game_name: req.body.game_name,
            game_timestamp: req.body.game_timestamp,
            game_day: req.body.game_day,
            game_vr: req.body.game_vr
        };

        // Save Game in the database
        Game.create(game)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Game."
                });
            });

    })
}

// Update a Game by the game_name in the request
exports.update = (req, res) => {
    const game_name = req.query.game_name;
    Game.update(req.body, {
        where: { game_name: game_name }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Game ${game_name} was updated successfully.`
            });
        } else {
            res.send({
                message: `Cannot update Game ${game_name}. Maybe Game was not found or req.body is empty!`
            });
        }
    }).catch(err => res.status(500).send({
        message: `Error updating Game with id=${id}`
    }))
};

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Game.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `Game ${id} was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete Game with id=${id}. Maybe Game was not found or req.body is empty!!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Game with id=${id}`
        });
    });
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
    Game.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Games were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all games."
            });
        });
};

// Filter all vr and no vr games
exports.findIfVr = (req, res) => {
    const vr = req.query.game_vr;
    Game.findAndCountAll({
        where: {
            game_vr: vr
        }
    }).then(data => {
        res.send({ "number of games": data.count, "games": data.rows });
    }).catch(err => {
        res.status(404).send({
            message: `Could not display ${vr} Games`
        });
    });
};