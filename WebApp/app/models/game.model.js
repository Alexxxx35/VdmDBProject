module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        game_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        game_timestamp: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        game_day: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        game_vr: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }

    }, {
        freezeTableName: true

    });

    return Game;
};