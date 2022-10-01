const cron = require("node-cron");
const { scheduleParisAQ } = require("./Controllers/AQControllers");
const app = require("./app");

// database configuration
require("./database/connection");
require("./database/Initialize");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// cron job for fetching air quality of paris every one minute
cron.schedule("* * * * *", scheduleParisAQ);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
