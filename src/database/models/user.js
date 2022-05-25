'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type:DataTypes.STRING,
      unique: true
    },
    phone: {
      type:DataTypes.STRING,
      unique: true
    },
    corenNumber: {
      type:DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    token: DataTypes.STRING,
    lastSeen: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('pending', 'active', 'blocked', 'inactive'),
      allowNull: false,
      defaultValue: 'pending'
    },
  });

  User.associate = (models) => {
    // define association here
    models.User.hasMany(models.PersonnelApplication, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
    models.User.hasMany(models.FirmApplication, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
    models.User.hasOne(models.Personnel, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
    models.User.hasOne(models.Firm, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
    models.User.hasOne(models.Admin, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
  };

  return User;
};