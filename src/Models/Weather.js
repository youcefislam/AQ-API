const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const zones = require("./Zones");

// Weather model definition
const weather = sequelize.define("weather", {
  idWeather: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pr: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hu: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ws: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  wd: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weatherTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idZone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

zones.hasMany(weather, { as: "weather", foreignKey: "idZone" });
weather.belongsTo(zones, { as: "zones", foreignKey: "idZone" });

module.exports = weather;
