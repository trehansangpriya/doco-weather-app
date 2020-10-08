//Install Request Module
//Require Request Module in Script
const request = require('request');

// Forecast function
const forecast = (long, lat, callback) => {
    // API url
    const url = 'http://api.weatherstack.com/current?access_key=32e06eaffa8b2eb06f3269752688ab0f&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    // http request to API
    request({ url, json: true }, (error, { body }) => {
        // Error Handling
        if (error) {
            callback('No Connection', undefined)
        } else if (body.error) {
            callback('Invalid Location', undefined)
        } else {
            // Getting data from API and sending as an object
            callback(undefined,
                // body.current.temperature + ' Degree Celcius, ' + body.current.weather_descriptions[0]
                {
                    temp: body.current.temperature,
                    desc: body.current.weather_descriptions[0],
                    icon: body.current.weather_icons[0]
                })
        }
    })
}

module.exports = forecast