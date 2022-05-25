'use strict';

module.exports = function (sequelize, DataTypes) {
  const FirmProject = sequelize.define("FirmProject", {
    firmProjectId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.TEXT,
      unique: true
    },
    effortLevel: {
      type: DataTypes.STRING,
      unique: true
    },
    engineeringField: {
      type: DataTypes.STRING,
    },
    serviceType: {
      type: DataTypes.STRING,
    },
    yearCompleted: {
      type: DataTypes.INTEGER,
    },
  });

  FirmProject.associate = (models) => {
    models.FirmProject.belongsTo(models.Firm, {
      foreignKey: {
        name: "firmId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  };

  return FirmProject;
}
