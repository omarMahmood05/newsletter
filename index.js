const http = require("http");
const requests = require("requests");
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const dot = require("dotenv").config();

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const url = "https://us18.api.mailchimp.com/3.0/lists/4696d7a34d";

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    // Old
    // 1bc84500603bec9b541746ac1a8966cb-us18-
    // New
    // 1023ff240d7cc32fa36176290e00a79c-us18
    // 85a6f6ad493246aa05e3242da6896aa6-us18
    auth: `omar:${process.env.DOTENV_KEY}-removeAlsoTheDash`,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      response.on("data", function (data) {
        res.sendFile(__dirname + "/success.html");
      });
    } else {
      res.sendfile(__dirname + "/failure.html");
    }
  });

  request.on("error", (e) => {
    console.error(e);
  });

  // request.write(jsonData);
  request.end();
});

app.post("/goBackHome", function (req, res) {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
