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

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});

// Use Mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

// Connect to mongoDB
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const router = express.Router();
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
  },
  leaguePoints: {
    type: Number,
    required: true
  }
});

const schemaMatch = new mongoose.Schema({
  matchId: String,
  gameCreation: Number,
  gameDuration: Number,
  gameEndTimestamp: Number,
  gameId: Number,
  gameMode: String,
  gameName: String,
  gameType: String
});

const modelSummoner = mongoose.model("Summoner", schemaSummoner, "Summoner");
const modelMatch = mongoose.model("Match", schemaMatch, "Match")

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
          const summonerLeagueDetail = await getRankById(jsonRiot.id);
          console.log(summonerLeagueDetail);
          const summonerRanked5vs5 = summonerLeagueDetail.find(({queueType}) => queueType === "RANKED_SOLO_5x5")

          const checkSummonerRanked = (summonerRanked5vs5 !== undefined && summonerRanked5vs5.length !== 0)
          jsonRiot.tier = checkSummonerRanked ? summonerRanked5vs5.tier : "unknown"
          jsonRiot.rank = checkSummonerRanked ? summonerRanked5vs5.rank : "unknown"
          jsonRiot.leaguePoints = checkSummonerRanked ? summonerRanked5vs5.leaguePoints : 0

          res.status(200).json(jsonRiot);
          await modelSummoner.collection.insertOne(jsonRiot, (err, result) => {
            console.log(result)
          });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(200).json(summoner);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getRankById(id) {
  try {
    console.log(id)
    const resRiot = await fetch(
      process.env.URL_RIOT_RANK_BY_ID +
      id +
      "?api_key=" +
      process.env.API_KEY_RIOT
    );
    return await resRiot.json()
  } catch (err) {
    console.log(err)
    return err
  }
}


async function getMatchesBySummonerPuuid(req, res) {
  const puuid = req.params.puuid;
  const resRiot = await fetch(
    process.env.URL_RIOT_MATCHES_BY_PUUID +
    puuid +
    "/ids?start=0&count=20&api_key=" +
    process.env.API_KEY_RIOT
  );
  const jsonRiot = await resRiot.json();
  if (resRiot.status === 200) {
    res.status(200).json(jsonRiot)
    return
  }
  if (res.status === 404) {
    res.status(404).json({message: "Not found"})
    return
  }
  res.status(500).json({message: "Error"})
}

async function getInfoMatchById(req, res) {
  const id = req.params.id;
  let match = null;
  await modelMatch.collection.findOne({ matchId: id }).then((res) => {
    match = res;
  });
  if (match === null) {
    const resRiot = await fetch(
      process.env.URL_RIOT_MATCH_BY_ID +
      id +
      "?api_key=" +
      process.env.API_KEY_RIOT
    );
    if (resRiot.status === 404) {
      res.status(404).json({message: "Not found"});
      return
    }
    const jsonRiot = await resRiot.json();
    console.log(jsonRiot.info)

    const matchModel = new modelMatch({
      matchId: id,
      gameCreation: jsonRiot.info.gameCreation,
      gameDuration: jsonRiot.info.gameDuration,
      gameEndTimestamp: jsonRiot.info.gameEndTimestamp,
      gameId: jsonRiot.info.gameId,
      gameMode: jsonRiot.info.gameMode,
      gameName: jsonRiot.info.gameName,
      gameType: jsonRiot.info.gameType
    })

    res.status(200).json(matchModel)
    await matchModel.save()
    return
  }
  res.status(200).json(match)
}

router.get("/summoner/:name", getSummonerByName);

router.get("/summoner/:puuid/matches", getMatchesBySummonerPuuid);

router.get("/matches/:id", getInfoMatchById);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);
});

app.use(express.json());
app.use('/api', router);
