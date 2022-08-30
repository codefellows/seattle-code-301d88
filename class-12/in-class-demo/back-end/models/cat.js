// This is where I will declare my schema
// Data should look like

'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract Schema property from the mongoose object

const { Schema } = mongoose;


const catSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  spayNeuter: { type: Boolean, required: true },
  location: { type: String, required: true }
});

// define our Model
// this is what gives our database functionality
const CatModel = mongoose.model('Cat', catSchema);


module.exports = CatModel;
