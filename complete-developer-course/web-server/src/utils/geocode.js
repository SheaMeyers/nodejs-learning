const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hlYTEyMzQiLCJhIjoiY2wwNWx0azlxMDhvcjNobW1naDRyYnE4biJ9.4KARElLTgkqRdXrcEO8c5g&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features && body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log("body.features")
            console.log(body.features)
            console.log("____")
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode