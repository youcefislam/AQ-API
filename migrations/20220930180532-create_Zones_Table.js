"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("zones", {
      idZone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      zone: {
        type: Sequelize.STRING(100),
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("zones");
  },
};
