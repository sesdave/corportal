'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmPersonnel = sequelize.define("FirmPersonnel", {
    firmPersonnelId: {
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
      type: DataTypes.STRING,
    },
    education: {
      type: DataTypes.STRING,
    },
    yearOfEmployment: {
      type: DataTypes.INTEGER,
    },
    cv: {
      type: DataTypes.STRING,
    },
  });

  FirmPersonnel.associate = (models) => {
    models.FirmPersonnel.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmPersonnel;
}
