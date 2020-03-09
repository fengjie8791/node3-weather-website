const request = require('request');

const forecast = (latitude, longtitude, callback) => {
 
    const url = 'https://api.darksky.net/forecast/a5abd1f457b56be5a4c19253ac4d1d6a/' + latitude + ',' + longtitude
    request({url, json: true}, (error, { body }) => {
        
        if (error){
            callback('Unable to connect the weather service!', undefined )
        } else if (body.error) {
            callback('Unable to find location', undefined )
        } else {
            callback(undefined , {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                timezone: body.timezone
            })
        }
    })
}

module.exports = forecast;