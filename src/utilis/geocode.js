const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVuZ2ppZTg3OTEiLCJhIjoiY2s3ZzBpa3hpMDBqZzNnbXVjM21jZmVsbSJ9.xvSIqpaJPwOWGIDa8siiFA&limit=1';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect the map service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try anthor search', undefined);
        } else{
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
                cityName: body.features[0].text
            })
        }
    })
}

module.exports = geocode;