const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
require('dotenv').config()

const app = express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);

let timeout = 0;

const errorMessage = {
  title: "Please Wait",
  detail: "Waiting for new Tweets to be posted...",
};

const authMessage = {
  title: "Could not authenticate",
  details: [
    `Please make sure your bearer token is correct. 
      If using Glitch, remix this app and add it to the .env file`,
  ],
  type: "https://developer.twitter.com/en/docs/authentication",
};

app.get("/api/tweets", async (req, res) => {
  try {
    const response = await get();

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.post("/api/rules", async (req, res) => {
  try {
      res.send(response);
  } catch (e) {
    res.send(e);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));