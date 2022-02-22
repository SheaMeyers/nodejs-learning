const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=6c67358c1eabe2253942409ab3f49772&query=37.8267,-122.4233&units=m'

request({ url, json: true }, (error, response) => {
    const current = response.body.current
    console.log(`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out.  It feels like ${current.feelslike} degrees out`)
})