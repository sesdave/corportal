'use strict';

module.exports = function (sequelize, DataTypes) {
  const PersonnelExpatriate = sequelize.define("PersonnelExpatriate", {
    personnelExpatriateId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    passportNumber: {
      type: DataTypes.STRING,
    },
    passportIssuePlace: {
      type: DataTypes.STRING,
    },
    passportIssueDate: {
      type: DataTypes.DATEONLY,
    },
    resPermNumber: {
      type: DataTypes.STRING,
    },
    resPermDuration: {
      type: DataTypes.STRING,
    },
    resPermIssuePlace: {
      type: DataTypes.STRING,
    },
    resPermIssueDate: {
      type: DataTypes.DATEONLY,
    },
    address: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  });

  PersonnelExpatriate.associate = (models) => {
    models.PersonnelExpatriate.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return PersonnelExpatriate;
}
