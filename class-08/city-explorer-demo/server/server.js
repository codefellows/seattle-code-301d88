'use strict';

// Require:
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// Express Instance:
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, () => console.log(`listening on ${PORT}`));


////////////////////////////////////////////

// Endpoints
app.get('/photos', getPhotos);

async function getPhotos(request, response) {
    // note the .searchQuery
    const searchQuery = request.query.searchQuery;
    const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;
    try {
        // axios get request to our api
        const photosResponse = await axios.get(url);
        // console.log(photosResponse);
        // groomed data
        const photoArray = photosResponse.data.results.map(photo => new Photo(photo));
        response.status(200).send(photoArray);
    } catch (err) {
        console.log('error message is: ', err);
        response.status(500).send(`server error`);
    }
}

class Photo {
    constructor(obj) {
        this.img_url = obj.urls.regular;
        this.original_image = obj.links.self;
        this.photographer = obj.user.name;
    }
}

// Catch all
app.get('*', notFound);

function notFound(request, response) {
    response.status(404).send('The page you are looking for is not there!');
}
