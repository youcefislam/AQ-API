const express = require("express");
const pollutionRouter = require("./Routes/Pollution");

const app = express();

// routes configuration
app.use("/pollution", pollutionRouter);

// fallback
app.get("*", function (req, res) {
  res.status(404).send({ error: "NOT_FOUND" });
});

module.exports = app;
