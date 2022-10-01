const Weather = require("../Models/Weather");
const Pollution = require("../Models/Pollution");
const Zones = require("../Models/Zones");
const moment = require("moment");
const sequelize = require("sequelize");

// Select queries
// zone getter
const getZoneByName = async (zone) => {
  try {
    const zoneResult = await Zones.findOne({
      where: {
        zone,
      },
    });
    return zoneResult;
  } catch (error) {
    console.log(error);
  }
};

// get pollution of a zone where most polluted
const getMostPolluted = async (zone) => {
  try {
    const dateMostPolluted = await Pollution.findOne({
      attributes: [
        sequelize.fn("MAX", sequelize.col("aqius")),
        "pollutionTime",
      ],
      include: {
        model: Zones,
        as: "zones",
        required: true,
        where: {
          zone,
        },
      },
    });
    return dateMostPolluted;
  } catch (error) {
    console.log(error);
  }
};

// Insertions DB queries
// insert zone
const insertZone = async (zone) => {
  try {
    const newZone = await Zones.create({
      zone,
    });
    return newZone;
  } catch (error) {
    console.log(error);
  }
};

// insert weather and pollution
const insertAQ = async (weather, pollution, idZone) => {
  try {
    const NOW = moment().format();
    const newWeather = await Weather.create({
      ...weather,
      weatherTime: NOW,
      idZone,
    });
    const newPollution = await Pollution.create({
      ...pollution,
      pollutionTime: NOW,
      idZone,
    });
    return { newWeather, newPollution };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getZoneByName,
  insertZone,
  insertAQ,
  getMostPolluted,
};
