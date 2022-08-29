'use strict';

const axios = require('axios');

let cache = {};

async function getPhotos(request, response, next) {
  try {
 
    let searchQueryFromFrontEnd = request.query.searchQuery;

    // create a custom key for each route and search result
    let key = searchQueryFromFrontEnd + 'photo';
    // if the cache exists AND is valid... send THAT data
    if(cache[key] && (Date.now() - cache[key].timeStamp < 1000 * 20)){
      console.log('Cache was hit, images present');
      response.status(200).send(cache[key].data);
    } else{
      console.log('Cache missed - no images present');

      let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromFrontEnd}`;
      
      let photoResults = await axios.get(url);
      let groomedData = photoResults.data.results.map(pic => new Photo(pic));

      // ADD TO THE CACHE OBJECT:
      cache[key] = {
        data: groomedData,
        timeStamp: Date.now()
      }
      
      console.log('cache', cache);
      response.status(200).send(groomedData);
    }
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