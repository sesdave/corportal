'use strict';

module.exports = (sequelize, DataTypes) => {
  const FirmFee = sequelize.define('FirmFee', {
    firmFeeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    adminId: DataTypes.STRING,
    feeItemId: DataTypes.STRING,
    year: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    firmCategory: DataTypes.STRING,
    firmSize: DataTypes.STRING,
    liveAndWorkInNigeria: DataTypes.BOOLEAN,
    isProfessionalBodyMember: DataTypes.BOOLEAN,
    membershipType: {
      type: DataTypes.ENUM('applicant', 'registered'),
      allowNull: false,
      defaultValue: 'applicant'
    },
    status: {
      type: DataTypes.ENUM('pending', 'published', 'inactive'),
      allowNull: false,
      defaultValue: 'pending'
    },
  });

  FirmFee.associate = (models) => {
    // define association here
    models.FirmFee.belongsTo(models.Admin, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    models.FirmFee.belongsTo(models.FeeItem, {
      foreignKey: {
        name: 'feeItemId',
        type: DataTypes.STRING
      }
    });
  };

  return FirmFee;
};