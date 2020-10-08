//Install Request Module
//Require Request Module in Script
const request = require('request');

//Get Location details using geocode() Function
const geocode = (address, callback) => {
    // Declaring the url with user's API Token from Mapbox
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJlaGFuc2FuZ3ByaXlhIiwiYSI6ImNrZmJmazNqbTE1YWozMHBwODBhc2g2YWEifQ.IP2FvVN9qzWtP2L_OLQiuw&limit=1'
    //Creating a http request through the API
    request({ url, json: true }, (error, { body } = {}) => {
        // Error Handling
        if (error) {
            callback('Unable to connect to Location Services', undefined)
        } else if (body.features.length === 0) {
            callback('Invalid Address! Try another search', undefined)
        } else {
            // Sending data from the API as an Object
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode