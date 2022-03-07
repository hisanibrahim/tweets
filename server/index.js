const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const needle = require("needle");
require("dotenv").config();

const token = process.env.BEARER_TOKEN;
const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL = "https://api.twitter.com/2/tweets/search/stream";
const recentURL = "https://api.twitter.com/2/tweets/search/recent";

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const tweets = [];

async function getAllRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    console.log("Error:", response.statusMessage, response.statusCode);
    throw new Error(response.body);
  }

  return response.body;
}

async function deleteAllRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids: ids,
    },
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body);
  }

  return response.body;
}

async function setRules(keyword) {
  const rules = [
    {
      value: keyword,
      tag: "keyword search",
    },
  ];
  const data = {
    add: rules,
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body);
  }

  return response.body;
}

function streamConnect(retryAttempt) {
  const stream = needle.get(streamURL, {
    headers: {
      "User-Agent": "v2FilterStreamJS",
      Authorization: `Bearer ${token}`,
    },
    timeout: 20000,
  });

  stream
    .on("data", (data) => {
      try {
        const json = JSON.parse(data);
        tweets.push(json)
        console.log(tweets);
        retryAttempt = 0;
      } catch (e) {
        if (
          data.detail ===
          "This stream is currently at the maximum allowed connection limit."
        ) {
          console.log(data.detail);
          process.exit(1);
        } else {
          // Keep alive signal received. Do nothing.
        }
      }
    })
    .on("err", (error) => {
      if (error.code !== "ECONNRESET") {
        console.log(error.code);
        process.exit(1);
      } else {
        setTimeout(() => {
          console.warn("A connection error occurred. Reconnecting...");
          streamConnect(++retryAttempt);
        }, 2 ** retryAttempt);
      }
    });

  return stream;
}

const startStream = async (keyword) => {
  let currentRules;
  try {
    currentRules = await getAllRules();
    await deleteAllRules(currentRules);
    await setRules(keyword);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  streamConnect(0);
};

module.exports = {
  startStream,
};

app.get("/api/tweets", async (req, res) => {
  try {
    const response = needle.get(streamURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 20000,
        
      });
    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.post("/api/rules", async (req, res) => {
  try {
    const { keyword } = req.body;
    startStream(keyword);
    res.send({ success: true });
  } catch (e) {
    res.send(e);
  }
});

server.listen(port, () => console.log(`Listening on port ${port}`));
