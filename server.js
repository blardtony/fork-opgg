// Use env
require('dotenv').config();

// Use Express
const express = require("express");

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

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */

const getStatus = (req, res) => {
  res.status(200).json("Status up");
}
router.get("/status", getStatus);


routes.push(getStatus);


app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`);
});

app.use(express.json());

app.use('/api/', routes)
