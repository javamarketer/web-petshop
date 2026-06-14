const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Petshop = sequelize.define(
    'Petshop',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Petshop name cannot be empty',
          },
          len: {
            args: [3, 255],
            msg: 'Petshop name must be between 3 and 255 characters',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Address cannot be empty',
          },
        },
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'City cannot be empty',
          },
        },
      },
      province: {
        type: DataTypes.STRING(100),
        defaultValue: 'Yogyakarta',
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: {
          msg: 'Phone number already exists',
        },
        validate: {
          notEmpty: {
            msg: 'Phone cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email',
          },
        },
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate: {
          min: {
            args: [-90],
            msg: 'Latitude must be between -90 and 90',
          },
          max: {
            args: [90],
            msg: 'Latitude must be between -90 and 90',
          },
        },
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
        validate: {
          min: {
            args: [-180],
            msg: 'Longitude must be between -180 and 180',
          },
          max: {
            args: [180],
            msg: 'Longitude must be between -180 and 180',
          },
        },
      },
      opening_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      closing_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'petshops',
      timestamps: true,
      underscored: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: ['city'],
          name: 'idx_city',
        },
        {
          fields: ['name'],
          name: 'idx_name',
        },
        {
          fields: ['is_active'],
          name: 'idx_is_active',
        },
      ],
    }
  );

  Petshop.associate = (models) => {
    Petshop.hasMany(models.Product, {
      foreignKey: 'petshop_id',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };

  return Petshop;
};
