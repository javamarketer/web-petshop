'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      petshop_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'petshops',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_available: {
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
    await queryInterface.addIndex('products', ['petshop_id'], { name: 'idx_petshop_id' });
    await queryInterface.addIndex('products', ['category'], { name: 'idx_category' });
    await queryInterface.addIndex('products', ['brand'], { name: 'idx_brand' });
    await queryInterface.addIndex('products', ['is_available'], {
      name: 'idx_is_available',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
