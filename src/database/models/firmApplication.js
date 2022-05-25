'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmApplication = sequelize.define("FirmApplication", {
    firmAppId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    firmName: {
      type: DataTypes.STRING,
    },
    firmType: {
      type: DataTypes.STRING,
    },
    yearOfIncorporation: {
      type: DataTypes.INTEGER,
    },
    rcNumber: {
      type: DataTypes.STRING,
    },
    rcRegType: {
      type: DataTypes.STRING,
    },
    practiceState: {
      type: DataTypes.STRING,
    },
    firmCategory: {
      type: DataTypes.STRING,
    },
    firmSize: {
      type: DataTypes.STRING,
    },
    consultingRegType: {
      type: DataTypes.STRING,
    },
    cacDoc: {
      type: DataTypes.STRING,
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
  });

  FirmApplication.associate = (models) => {
    models.FirmApplication.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    models.FirmApplication.hasMany(models.TreatmentLog, {
      foreignKey: {
        name: 'firmAppId',
        type: DataTypes.STRING
      }
    });
  };

  return FirmApplication;
}
