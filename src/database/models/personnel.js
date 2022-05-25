'use strict';

module.exports = function (sequelize, DataTypes) {
  const Personnel = sequelize.define("Personnel", {
    personnelId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    profileImage: {
      type: DataTypes.STRING,
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
    personnelCategory: {
      type: DataTypes.STRING,
    },
    engineeringBase: {
      type: DataTypes.STRING,
    },
    engineeringField: {
      type: DataTypes.STRING,
    },
    isCorenMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },

    email: {
      type:DataTypes.STRING,
      unique: true
    },
    phone: {
      type:DataTypes.STRING,
      unique: true
    },
    alt_phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    contactCity: {
      type: DataTypes.STRING,
    },
    contactState: {
      type: DataTypes.STRING,
    },
    contactCountry: {
      type: DataTypes.STRING,
    },
    practiceCity: {
      type: DataTypes.STRING,
    },
    practiceState: {
      type: DataTypes.STRING,
    },
    practiceCountry: {
      type: DataTypes.STRING,
    },

    sex: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    originLGA: {
      type: DataTypes.STRING,
    },
    originState: {
      type: DataTypes.STRING,
    },
    originCountry: {
      type: DataTypes.STRING,
    },
    registrationDate: {
      type: DataTypes.DATE,
    },
    about: {
      type: DataTypes.TEXT,
    },
  });

  Personnel.associate = (models) => {
    models.Personnel.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    models.Personnel.hasMany(models.PersonnelEducation, {
      foreignKey: {
        name: 'personnelId',
        type: DataTypes.STRING
      }
    });
    models.Personnel.hasMany(models.PersonnelMembership, {
      foreignKey: {
        name: 'personnelId',
        type: DataTypes.STRING
      }
    });
    models.Personnel.hasMany(models.PersonnelWorkExperience, {
      foreignKey: {
        name: 'personnelId',
        type: DataTypes.STRING
      }
    });
    models.Personnel.hasMany(models.PersonnelExpatriate, {
      foreignKey: {
        name: 'personnelId',
        type: DataTypes.STRING
      }
    });
  };

  return Personnel;
}
