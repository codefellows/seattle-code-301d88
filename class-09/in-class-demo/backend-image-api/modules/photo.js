'use strict';

const axios = require('axios');

async function getPhotos(request, response, next) {
  try {
    // the front will send a value to use to search for photos
    let searchQueryFromFrontEnd = request.query.searchQuery;

    // take that value and use it to construct a URL to make a request the API
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;

    let photoResults = await axios.get(url);

    let groomedData = photoResults.data.results.map(pic => new Photo(pic));
    response.status(200).send(groomedData);
  } catch (error) {
    next(error)
  }
}

// ******** REFACTOR WITH CHAINING *******

function getPhotosWithChaining(request, response, next) {
  let searchQueryFromFrontEnd = request.query.searchQuery;
  let baseUrl = `https://api.unsplash.com/search/photos`;
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQueryFromFrontEnd,
  }

  axios.get(baseUrl, { params })
    .then(photoResults => photoResults.data.results.map(pic => new Photo(pic)))
    .then(groomedData => response.status(200).send(groomedData))
    .catch(error => console.log(error));
}

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;