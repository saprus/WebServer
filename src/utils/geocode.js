const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FwcnVzIiwiYSI6ImNrcGowZzV5ejB3ODUybmprbDNwZzMwcDAifQ.4oBIybMoEfiJNd0S9CmynQ&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined) // no value for data, but string value for error
        }
        else if (response.body.features.length === 0) {
            callback('Location not found, try another search! ', undefined) // here is also the same as above
        }
        else {
            // here its opposite, we have undefined for error but a value for data
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode