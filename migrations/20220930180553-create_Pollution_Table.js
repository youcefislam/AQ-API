"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("pollution", {
      idPollution: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      aqius: {
        type: Sequelize.INTEGER,
      },
      mainus: {
        type: DataTypes.STRING(5),
      },
      aqicn: {
        type: Sequelize.INTEGER,
      },
      maincn: {
        type: DataTypes.STRING(5),
      },
      pollutionTime: {
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
    return queryInterface.dropTable("pollution");
  },
};
