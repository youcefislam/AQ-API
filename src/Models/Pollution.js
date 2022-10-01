const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const zones = require("./Zones");

// Pollution model definition
const pollution = sequelize.define("pollution", {
  idPollution: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  aqius: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mainus: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  aqicn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maincn: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  pollutionTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idZone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "zones",
      key: "idZone",
    },
  },
});

zones.hasMany(pollution, { as: "pollution", foreignKey: "idZone" });
pollution.belongsTo(zones, { as: "zones", foreignKey: "idZone" });

module.exports = pollution;
