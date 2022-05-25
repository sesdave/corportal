'use strict';

module.exports = function (sequelize, DataTypes) {
  const PersonnelWorkExperience = sequelize.define("PersonnelWorkExperience", {
    personnelWorkExpId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    businessName: {
      type: DataTypes.STRING,
    },
    businessType: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    position: {
      type: DataTypes.STRING,
    },
    duties: {
      type: DataTypes.TEXT,
    },
    workCost: {
      type: DataTypes.TEXT,
    },
    papers: {
      type: DataTypes.TEXT,
    },
  });

  PersonnelWorkExperience.associate = (models) => {
    models.PersonnelWorkExperience.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return PersonnelWorkExperience;
}
