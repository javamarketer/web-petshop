const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');

const db = {
  sequelize,
  Sequelize: require('sequelize'),
};

// Load models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
