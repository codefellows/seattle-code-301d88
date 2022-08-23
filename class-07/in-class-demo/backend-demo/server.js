'use strict';

console.log('YAASS our first server!');

// REQUIRES - we use require on the backend and import on the front end
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');
const cors = require('cors');

// once express is in we need to use it - per express docs
const app = express();

// middleware to share resources across the internet
app.use(cors());

// define my port for my server to listen on
const PORT = process.env.PORT || 3002;
// 3002 — if my server runs on 3002, I know something is wrong with my .env file or how I'm importing the values from it


// ROUTES - our endpoints

// Base route - proof of life
// .get() is an express method
// it correlates to axios.get
// the first parameter is a URL in quote,
// the second is a callback function
app.get('/', (request, response) => {
  console.log('This is showing up in the terminal!');
  response.status(200).send('Welcome to our server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName} from the hello route!`);
});

app.get('/pet', (request, response, next) => {
  try {
    let species = request.query.species;
    // console.log(species);
    let dataToGroom = data.find(pet => pet.species === species);
    let dataToSend = new Pet(dataToGroom);
    response.status(200).send(dataToSend);
  } catch (error) {
    // if I have an error, this will create a new instance of the Error Object that lives in Express.
    next(error);
  }
});

class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

// Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});

// LISTEN
// starts the server
// .listen() is an express method that takes in a PORT value and a callback function
app.listen(PORT, ()=> console.log(`We are up on PORT: ${PORT}`));
