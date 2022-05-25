'use strict';

module.exports = function (sequelize, DataTypes) {
  const PersonnelMembership = sequelize.define("PersonnelMembership", {
    personnelMembershipId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    orgName: {
      type: DataTypes.STRING,
    },
    orgType: {
      type: DataTypes.STRING,
    },
    orgBase: {
      type: DataTypes.STRING,
    },
    regDate: {
      type: DataTypes.DATE,
    },
    memGrade: {
      type: DataTypes.STRING,
    },
    memNumber: {
      type: DataTypes.STRING,
    },
  });

  PersonnelMembership.associate = (models) => {
    models.PersonnelMembership.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return PersonnelMembership;
}
