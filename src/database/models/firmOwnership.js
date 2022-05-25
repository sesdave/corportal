'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmOwnership = sequelize.define("FirmOwnership", {
    firmOwnershipId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isCorenMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    corenNumber: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.INTEGER,
    },
  });

  FirmOwnership.associate = (models) => {
    models.FirmOwnership.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmOwnership;
}
