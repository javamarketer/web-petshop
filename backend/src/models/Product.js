const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      petshop_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Petshop ID cannot be empty',
          },
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Product name cannot be empty',
          },
          len: {
            args: [3, 255],
            msg: 'Product name must be between 3 and 255 characters',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category cannot be empty',
          },
        },
      },
      brand: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: 'Price cannot be negative',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: 'Stock cannot be negative',
          },
        },
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      underscored: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: ['petshop_id'],
          name: 'idx_petshop_id',
        },
        {
          fields: ['category'],
          name: 'idx_category',
        },
        {
          fields: ['brand'],
          name: 'idx_brand',
        },
        {
          fields: ['is_available'],
          name: 'idx_is_available',
        },
      ],
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Petshop, {
      foreignKey: 'petshop_id',
      as: 'petshop',
      onDelete: 'CASCADE',
    });
  };

  return Product;
};
