const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e2019eadacae049de189d8d034c9be8&query=' + longitude + ',' + latitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Cannot connect to weather service!', undefined)
        }
        else if (response.body.error) {
            callback('Cannot find the location provided!', undefined)
        }
        else {

            callback(undefined, response.body.current.weather_descriptions[0] + ". It's currently " + response.body.current.temperature + "°C" + ", but feels like " + response.body.current.feelslike + "°C")
        }
    })

}

module.exports = forecast