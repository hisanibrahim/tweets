const express = require("express");
const bodyParser = require("body-parser");
// const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { startStream } = require("./stream");
// const tweets = require("../tweets");

const app = express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// let timeout = 0;

// const errorMessage = {
//   title: "Please Wait",
//   detail: "Waiting for new Tweets to be posted...",
// };

// const authMessage = {
//   title: "Could not authenticate",
//   details: [
//     `Please make sure your bearer token is correct. 
//       If using Glitch, remix this app and add it to the .env file`,
//   ],
//   type: "https://developer.twitter.com/en/docs/authentication",
// };

app.get("/api/tweets", async (req, res) => {
  try {
    // const response = await get();

    res.send({});
  } catch (e) {
    res.send(e);
  }
});

app.post("/api/rules", async (req, res) => {
  try {
    const { keyword } = req.body;
    startStream(keyword);
    res.send({ success: true});
  } catch (e) {
    res.send(e);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));
