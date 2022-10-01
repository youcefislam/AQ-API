const joi = require("joi");
const dbPool = require("../database/connection");
const { getAirQuality, saveAirQuality } = require("../Utilities/Utility");
const { getMostPolluted } = require("../Utilities/Query");

// parameters validation for coordinates
const COORDINATES = joi.object({
  latitude: joi.number().greater(-90).less(90).required(),
  longitude: joi.number().greater(-180).less(180).required(),
});

// get pollution of a given coordinates endpoint controller
const getPollutionByCoordinates = async (req, res) => {
  try {
    const { error, value } = COORDINATES.validate(req.params);
    if (error) {
      res.status(400).send({ error: "invalid_coordinates" });
    } else {
      const airQuality = await getAirQuality(value.latitude, value.longitude);
      res.status(airQuality?.status).send({
        Result: {
          Pollution: airQuality?.data?.data?.current?.pollution,
        },
      });
    }
  } catch (error) {
    const response = error?.response;
    console.log("## IQAIR fetching error: ", response?.data);
    if (response?.status == 403)
      res.status(500).send({ error: "internal_server_error" });
    else
      res
        .status(response?.status)
        .send({ error: response?.data?.data?.message });
  }
};

// get date and time where paris was most polluted endpoint controller
const getMostPollutionDateParis = async (req, res) => {
  try {
    const dateMostPolluted = await getMostPolluted("Paris");
    let status = dateMostPolluted?.pollutionTime ? 200 : 204;
    res.status(status).send({ datetime: dateMostPolluted?.pollutionTime });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal_server_error" });
  }
};

// get paris AQ cron job controller
const scheduleParisAQ = async () => {
  try {
    const LATITUDE = 48.856613;
    const LONGITUDE = 2.352222;

    let airQuality = await getAirQuality(LATITUDE, LONGITUDE);
    await saveAirQuality(airQuality?.data?.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPollutionByCoordinates,
  getMostPollutionDateParis,
  scheduleParisAQ,
};
