'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('petshops', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING(100),
        defaultValue: 'Yogyakarta',
      },
      postal_code: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      opening_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      closing_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Create indexes
    await queryInterface.addIndex('petshops', ['city'], { name: 'idx_city' });
    await queryInterface.addIndex('petshops', ['name'], { name: 'idx_name' });
    await queryInterface.addIndex('petshops', ['is_active'], { name: 'idx_is_active' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('petshops');
  },
};
