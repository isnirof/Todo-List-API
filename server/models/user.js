'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          args: true,
          msg: `Name can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, option) => {
        // const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, 10)
        instance.password = hash
      }
    }
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};