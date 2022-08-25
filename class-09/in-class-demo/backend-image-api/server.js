'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const getPhotos = require('./modules/photo.js');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Hello from our server!');
});

app.get('/photos', getPhotos);

app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ERRORS
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));