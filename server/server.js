const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const token = process.env.BEARER_TOKEN;
const recentURL = "https://api.twitter.com/2/tweets/search/recent";

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const server = http.createServer(app);

app.get("/api/tweets", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(recentURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query ? query : "world",
      },
    });
    res.send(response.data);
  } catch (e) {
    res.send(e);
  }
});

app.use(express.static(path.resolve(__dirname, "./client")));

server.listen(port, () => console.log(`Listening on port ${port}`));
