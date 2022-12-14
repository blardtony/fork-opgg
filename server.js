// Use env
require('dotenv').config();

// Use Express
const express = require("express");

// Use node-fetch
const fetch = require('node-fetch');

// Create new instance of the express server
const app = express();

// Define port
const port = 3000;

// Use Mongoose
const mongoose = require("mongoose");

// Connect to mongoDB
mongoose.set('strictQuery', true);

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to database'))

// Use Router
const router = express.Router();

// Routes api
const routes = [];


const getStatus = (req, res) => {
  res.status(200).json("Status up");
}
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
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  puuid: {
    type: String,
    required: true
  },
  summonerLevel: {
    type: Number,
    required: true
  },
  revisionDate: {
    type: Number,
    required: true
  },
  profileIconId: {
    type: Number,
    required: true
  }
});


const modelSummoner = mongoose.model('Summoner', schemaSummoner);

const getSummonerByName = async (req, res) => {
  try {
    const name = req.params.name;
    const summoner = await modelSummoner.findOne({name: name});
    if (null === summoner) {
      console.log("Call api riot")
    }
    res.json(summoner);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}
router.get("/summoner/:name", getSummonerByName);

routes.push(getSummonerByName);

app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);
});

app.use(express.json());

app.use('/api/summoner', routes)
