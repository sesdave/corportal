'use strict';

module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    permissionId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  });

  Permission.associate = (models) => {
    // define association here
    models.Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      // targetKey: 'roleId',
      // sourceKey: 'permissionId',
    });
  };

  return Permission;
};