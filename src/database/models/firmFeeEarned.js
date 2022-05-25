'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmFeeEarned = sequelize.define("FirmFeeEarned", {
    firmFeeEarnedId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    year: {
      type: DataTypes.INTEGER
    },
    feeEarned: {
      type: DataTypes.FLOAT
    },
  });

  FirmFeeEarned.associate = (models) => {
    models.FirmFeeEarned.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmFeeEarned;
}
