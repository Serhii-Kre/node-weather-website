const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4511e4f0e652f78843653835cffc2fa&query='+latitude+','+longitude+'&units=m'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
          callback('unable to connect to the server', undefined)
        } else if(body.error) {
            callback('unable to find such a location', undefined)
        } else {
          console.log(body)
            callback(undefined, 'It is currently: ' + body.current.temperature + ' <br />It feels like: ' + body.current.feelslike + '<br /> and humidity: ' + body.current.humidity)
 
        }
        
      }) 
}

module.exports = forecast