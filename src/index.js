"use strict";

require('dotenv').config();

const express = require("express");
const cors = require("cors");
const helmet = require('helmet');

const app = express();
const routes = require('./routes');
const db = require('./database/models');

app.set('trust proxy', 1) // trust first proxy

// bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors())
app.options('*', cors())

app.use(helmet())

function customHeaders(req, res, next) {
  app.disable('x-powered-by');
  res.setHeader('X-Powered-By', 'COREN');
  next();
}
app.use(customHeaders);

// routes linking
app.use('/', routes);

const PORT = process.env.PORT || 6006;

const listener = () => app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

db.init()
  .then(async () => {
    console.log("Database connected!");
    await require('./utils/initializeApp')();
    listener();
  })
  .catch((err) => console.log("Something went wrong with the Database Update:", err));