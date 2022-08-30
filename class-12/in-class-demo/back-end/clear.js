'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat');

async function clear() {
  try {
    await Cat.deleteMany({});
    console.log('cats cleared from DB');
  } catch (err) {
    console.error(err);
  // a 'finally' callback allows you to execute logic once your Promise has been settled, resolved or rejected, one way or the other. It has no impact on the value that your promise will resolve to
  } finally {
    mongoose.disconnect();
  }
}

clear();
