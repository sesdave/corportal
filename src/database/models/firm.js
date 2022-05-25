'use strict';

module.exports = function (sequelize, DataTypes) {
  const Firm = sequelize.define("Firm", {
    firmId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    firmName: {
      type: DataTypes.STRING,
    },
    firmType: {
      type: DataTypes.STRING,
    },
    yearEstablished: {
      type: DataTypes.INTEGER,
    },
    rcNumber: {
      type: DataTypes.STRING,
    },
    rcRegType: {
      type: DataTypes.STRING,
    },
    rcRegYear: {
      type: DataTypes.INTEGER,
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
    formerName: {
      type: DataTypes.STRING,
    },
    formerYearEstablished: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
  });

  Firm.associate = (models) => {
    models.Firm.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    models.Firm.hasMany(models.TreatmentLog, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmBranch, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmFeeEarned, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmOwnership, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmPersonnel, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmProject, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmService, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
    models.Firm.hasMany(models.FirmSpecialization, {
      foreignKey: {
        name: 'firmId',
        type: DataTypes.STRING
      }
    });
  };

  return Firm;
}
