// Use env
require("dotenv").config();

// Use Express
const express = require("express");

// Use node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Create new instance of the express server
const app = express();

// Define port
const port = 3000;

// Use Mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// Connect to mongoDB
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to database"));

const getStatus = (req, res) => {
  res.status(200).json("Status up");
};
/**
 * GET: Get server status
 */
app.get("/api/status", getStatus);

/**
 * Create Schema Summoner for MongoDb
 */
const schemaSummoner = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  puuid: {
    type: String,
    required: true,
  },
  summonerLevel: {
    type: Number,
    required: true,
  },
  revisionDate: {
    type: Number,
    required: true,
  },
  profileIconId: {
    type: Number,
    required: true,
  },
  tier: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  }
});

const modelSummoner = mongoose.model("Summoner", schemaSummoner, "Summoner");

async function getSummonerByName(req, res) {
  try {
    const name = req.params.name.toLowerCase();
    let summoner = null;
    await modelSummoner.collection.findOne({ name: name }).then((res) => {
      summoner = res;
    });
    if (summoner == null) {
      try {
        const resRiot = await fetch(
          process.env.URL_RIOT_SUOMMNER_BY_NAME +
            name +
            "?api_key=" +
            process.env.API_KEY_RIOT
        );
        if (resRiot.status === 404) {
          res.status(404).json({message: "Not found"});
        }
        else {
          const jsonRiot = await resRiot.json();

          jsonRiot.name = jsonRiot.name.toLowerCase();

          getRankById(jsonRiot, res);
          // res.status(200).json(jsonRiot.id);

          await modelSummoner.collection.insertOne(jsonRiot, (err, result) => {
            console.log(result)
          });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      // getRankById(summoner.id, res);
      res.status(200).json(summoner);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getRankById(jsonRiot, res) {
      try {
        const resRiot = await fetch(
          process.env.URL_RIOT_RANK_BY_ID +
            jsonRiot.id +
            "?api_key=" +
            process.env.API_KEY_RIOT
        );
        if (resRiot.status === 404) {
          res.status(404).json({message: "Not found"});
        }
        else {
          const _jsonRiot = await resRiot.json();

          jsonRiot["rank"] = _jsonRiot[0].rank
          jsonRiot["tier"] = _jsonRiot[0].tier

          console.log(jsonRiot)

          await modelSummoner.collection.insertOne(jsonRiot, (err, result) => {
            console.log(result)
          });

          res.status(200).json(jsonRiot);
      }
    } catch (err) {
      console.log(err)
    }
  
}

app.get("/api/summoner/:name", getSummonerByName);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);
});

app.use(express.json());
