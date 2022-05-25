'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmSpecialization = sequelize.define("FirmSpecialization", {
    firmSpId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    field: {
      type: DataTypes.STRING,
    },
  });

  FirmSpecialization.associate = (models) => {
    models.FirmSpecialization.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmSpecialization;
}
