'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Peoples', [{
      username: 'John Doe',
      password: 'password',
      email: 'john.doe@gmail.com',
      dob: '1-1-2001',
      phone: 9898989890,
      nationality: 'Indian',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Peoples', null, {});
  }
};
