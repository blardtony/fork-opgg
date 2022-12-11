// Use env
require('dotenv').config();

// Use Express
const express = require("express");

// Use Mongoose
const mongo = require("mongoose");
mongo.set('strictQuery', true);

// Use body-parser
const bodyParser = require("body-parser");

// Connect to mongoDB
const db = mongo
  .connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB echouee " + err));

// Create new instance of the express server
const app = express();

const port = 3000;

app.use(bodyParser.json());

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
