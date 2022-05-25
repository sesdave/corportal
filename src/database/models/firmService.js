'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmService = sequelize.define("FirmService", {
    firmServiceId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT
    },
    priority: {
      type: DataTypes.INTEGER,
    },
  });

  FirmService.associate = (models) => {
    models.FirmService.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmService;
}
