'use strict';

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    adminId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    roleId: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    accessStates: DataTypes.TEXT,
    accessCategories: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('pending', 'published', 'inactive'),
      allowNull: false,
      defaultValue: 'pending'
    },
  });

  Admin.associate = (models) => {
    // define association here
    models.Admin.belongsTo(models.Role, {
      foreignKey: {
        name: 'roleId',
        type: DataTypes.STRING
      }
    });
    models.Admin.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        type: DataTypes.STRING
      }
    });
    models.Admin.hasMany(models.FeeItem, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    models.Admin.hasMany(models.FirmFee, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    models.Admin.hasMany(models.PersonnelFee, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    // models.Admin.hasMany(models.Role, {
    //   foreignKey: {
    //     name: 'createdBy',
    //     type: DataTypes.STRING
    //   }
    // });
    models.Admin.hasMany(models.TreatmentLog, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
  };

  return Admin;
};