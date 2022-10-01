const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

// Zone model definition
module.exports = sequelize.define("zones", {
  idZone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  zone: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});
