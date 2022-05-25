'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'published', 'inactive'),
      allowNull: false,
      defaultValue: 'pending'
    },
  });

  Role.associate = (models) => {
    // define association here
    models.Role.hasMany(models.Admin, {
      foreignKey: {
        name: 'roleId',
        type: DataTypes.STRING
      }
    });
    // models.Role.belongsTo(models.Admin, {
    //   foreignKey: {
    //     name: 'createdBy',
    //     type: DataTypes.STRING
    //   }
    // });
    models.Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      // sourceKey: 'roleId',
      // targetKey: 'permissionId',
    });
  };

  return Role;
};