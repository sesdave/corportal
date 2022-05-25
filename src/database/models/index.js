'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/dbConfig.js');
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config.sequelizeParams,
    logging: false,
    multipleStatements: true,
  }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Automatically migrate database and connect.
const init = (p = false) => new Promise((resolve, reject) => {
  sequelize
    .sync({ force: p })
    .then(resolve)
    .catch(reject);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;

module.exports = db;
