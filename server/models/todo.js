'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model { }
  Todo.init(
    {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args:true,
            msg: `Task can't be empty`
          },
          notEmpty: {
            args:true,
            msg: `Task can't be empty`
          }
        }
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      dueDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER
    }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, option) => {
        instance.status = false
        instance.dueDate = instance.dueDate ? instance.dueDate : new Date()
      }
    }
  }
  )
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};