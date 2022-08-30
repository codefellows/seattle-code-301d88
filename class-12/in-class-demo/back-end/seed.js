'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}

  await Cat.create({
    name: 'Ronald',
    color: 'Orange tabby',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Ronald was added');

  await Cat.create({
    name: 'Karl',
    color: 'Black and white tabby',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Karl was added');

  await Cat.create({
    name: 'Victor',
    color: 'brown/black/white tabby',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Victor was added');

  mongoose.disconnect();
}

seed();
