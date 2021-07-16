'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('price', [{
                price_type: 'Senior',
                price_value: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                price_type: 'Plein tarif',
                price_value: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                price_type: 'Tarif reduit',
                price_value: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                price_type: 'Tarif etudiant',
                price_value: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: async(queryInterface) => {
        await queryInterface.bulkDelete('price', {
            price_type: {
                [Op.in]: ['Senior', 'Plein tarif', 'Tarif réduit', 'Etudiant']
            }
        });
    }
};