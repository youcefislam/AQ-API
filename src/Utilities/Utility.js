const axios = require("axios");
const dbPool = require("../database/connection");
const { getZoneByName, insertZone, insertAQ } = require("../Utilities/Query");

require("dotenv").config();

// request AQ by gps coordinates from IQAir Api
const getAirQuality = async (latitude, longitude) => {
  const result = await axios.get(
    `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`
  );
  return result;
};

// Save AQ data in the database functionality
const saveAirQuality = async (airQuality) => {
  let pollution = airQuality?.current?.pollution;
  let weather = airQuality?.current?.weather;
  let zone = airQuality?.city; // nearest city or zone name

  let zoneExist = await getZoneByName(zone);
  if (zoneExist) await insertAQ(weather, pollution, zoneExist.idZone);
  else {
    let newZone = await insertZone(zone);
    await insertAQ(weather, pollution, newZone.idZone);
  }
  return;
};

module.exports = {
  insertAQ,
  getAirQuality,
  saveAirQuality,
};
