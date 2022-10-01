"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("weather", {
      idWeather: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tp: {
        type: Sequelize.INTEGER,
      },
      pr: {
        type: Sequelize.INTEGER,
      },
      hu: {
        type: Sequelize.INTEGER,
      },
      ws: {
        type: Sequelize.FLOAT,
      },
      wd: {
        type: Sequelize.INTEGER,
      },
      weatherTime: {
        type: Sequelize.DATE,
      },
      idZone: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "zones",
          },
          key: "idZone",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("weather");
  },
};
