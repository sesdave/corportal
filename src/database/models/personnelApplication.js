'use strict';

module.exports = function (sequelize, DataTypes) {
  const PersonnelApplication = sequelize.define("PersonnelApplication", {
    personnelAppId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    otherNames: {
      type: DataTypes.STRING,
    },
    proposer1: {
      type: DataTypes.STRING,
    },
    proposer2: {
      type: DataTypes.STRING,
    },
    practiceState: {
      type: DataTypes.STRING,
    },
    personnelCategory: {
      type: DataTypes.STRING,
    },
    liveAndWorkInNigeria: {
      type: DataTypes.BOOLEAN,
    },
    isProfessionalBodyMember: {
      type: DataTypes.BOOLEAN,
    },
    professionalBody: {
      type: DataTypes.STRING,
    },
    professionalMembershipNumber: {
      type: DataTypes.STRING,
    },
    engineeringBase: {
      type: DataTypes.STRING,
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
  });

  PersonnelApplication.associate = (models) => {
    models.PersonnelApplication.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    models.PersonnelApplication.hasMany(models.TreatmentLog, {
      foreignKey: {
        name: 'personnelAppId',
        type: DataTypes.STRING
      }
    });
  };

  return PersonnelApplication;
}
