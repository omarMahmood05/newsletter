const http = require("http");
const requests = require("requests");
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");

const PORT = 3000;
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
