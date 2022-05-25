'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmBranch = sequelize.define("FirmBranch", {
    firmBranchId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      unique: true
    },
    state: {
      type: DataTypes.STRING,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    yearEstablished: {
      type: DataTypes.INTEGER,
    },
  });

  FirmBranch.associate = (models) => {
    models.FirmBranch.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmBranch;
}
