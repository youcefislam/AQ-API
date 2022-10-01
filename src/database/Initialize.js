const weather = require("../Models/Weather");
const pollution = require("../Models/Pollution");
const zones = require("../Models/Zones");
const sequelize = require("./connection");

sequelize.sync();
