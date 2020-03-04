'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Todos', [
      {
        task: 'Belajar',
        description: 'Harus semangat',
        status: false,
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        task: 'Latihan API',
        description: 'Harus semangat',
        status: false,
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        task: 'Latihan JQuery',
        description: 'Harus semangat',
        status: false,
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
