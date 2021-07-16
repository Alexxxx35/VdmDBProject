module.exports = (sequelize, Sequelize) => {
    const Price = sequelize.define("price", {
        price_type: {
            type: Sequelize.ENUM,
            values: ['Senior', 'Plein tarif', 'Tarif reduit', 'Tarif etudiant'],
            primaryKey: true
        },
        price_value: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    return Price;
};