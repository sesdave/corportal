'use strict';

module.exports = function (sequelize, DataTypes) {
  const PersonnelEducation = sequelize.define("PersonnelEducation", {
    personnelEducationId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    qualificationType: {
      type: DataTypes.STRING,
    },
    qualification: {
      type: DataTypes.STRING,
    },
    school: {
      type: DataTypes.STRING,
    },
    discipline: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    certificate: {
      type: DataTypes.STRING,
    },
  });

  PersonnelEducation.associate = (models) => {
    models.PersonnelEducation.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return PersonnelEducation;
}
