module.exports = (sequelize, Sequelize) => {
    const Buyer = sequelize.define("buyer", {
        buyer_fname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        buyer_lname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        buyer_age: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        buyer_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        buyer_civ: {
            type: Sequelize.ENUM,
            values: ['Monsieur', 'Madame', 'Mademoiselle'],
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });

    return Buyer;
};