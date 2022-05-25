'use strict';

module.exports = (sequelize, DataTypes) => {
  const TreatmentLog = sequelize.define('TreatmentLog', {
    treatmentId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    applicationStatus: {
      type: DataTypes.STRING
    },
    applicantType: DataTypes.STRING,
    submittedAt: DataTypes.DATE,
    treatedAt: DataTypes.DATE,
    reason: DataTypes.TEXT,
    firmId: DataTypes.STRING,
    personnelId: DataTypes.STRING,
    adminId: DataTypes.STRING,
  });

  TreatmentLog.associate = (models) => {
    // define association here
    models.TreatmentLog.belongsTo(models.Admin, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    models.TreatmentLog.belongsTo(models.Personnel, {
      foreignKey: {
        name: 'personnelId',
        type: DataTypes.STRING
      }
    });
    models.TreatmentLog.belongsTo(models.Firm, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
  };

  return TreatmentLog;
};