const express = require("express");
const {
  getPollutionByCoordinates,
  getMostPollutionDateParis,
} = require("../Controllers/AQControllers");

const Router = express.Router();

// Endpoints
// Get pollution data for given coordinates
Router.get("/current/:latitude/:longitude", getPollutionByCoordinates);

// date where paris was most polluted
Router.get("/most-polluted/paris", getMostPollutionDateParis);

module.exports = Router;
