module.exports = (sequelize, Sequelize) => {
    const Spectator = sequelize.define("spectator", {
        spectator_fname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        spectator_lname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        spectator_age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        spectator_civ: {
            type: Sequelize.ENUM,
            values: ['Monsieur', 'Madame', 'Mademoiselle'],
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });

    return Spectator;
};