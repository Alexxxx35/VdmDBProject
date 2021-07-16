module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        game_id: {
            type: Sequelize.INTEGER,
            // references: "game",
            // referencesKey: "id", 
            references: {
                model: 'game',
                key: 'id'
            },
            allowNull: false,
            primaryKey: true
        },
        buyer_id: {
            type: Sequelize.INTEGER,
            // references: "buyer",
            // referencesKey: "id",
            references: {
                model: 'buyer',
                key: 'id'
            },
            allowNull: false,
            primaryKey: true
        },
        spectator_id: {
            type: Sequelize.INTEGER,
            // references: "spectator",
            // referencesKey: "id",
            references: {
                model: 'spectator',
                key: 'id'
            },
            allowNull: false,
            primaryKey: true
        },
        booking_price: {
            type: Sequelize.ENUM,
            values: ['Senior', 'Plein tarif', 'Tarif reduit', 'Tarif etudiant'],
            allowNull: false,
            references: {
                model: 'price',
                key: 'price_type'
            }
        }
    }, {
        freezeTableName: true


    });
    return Booking;
};