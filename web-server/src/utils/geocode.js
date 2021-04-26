const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoic2VyZ2V5MDQwMzIwMjEiLCJhIjoiY2tsdjZ0bWg3MGUydTJvcGx0cHB4NWtzeSJ9.gVYiAPPp11f61lRvCm8RbA'
  
    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('unable to connect to the server', undefined)
      } else if(body.features.length === 0) {
        callback('unable to find such a location', undefined)
      } else {
        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
            
        })
      }
    }) 
  
    
  }

  module.exports = geocode