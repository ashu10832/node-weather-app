const request = require('request')
const geocode = require('./geocode')


const forecast = (address,callback) => {
    geocode.geocode(address,(error,{place_name,lat,lon} = {}) => {
        if(error){
            callback(error);
        }else{
            const url = 'http://api.weatherstack.com/current?access_key=748c8b1c382fdc792665835a39c1902c&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon); 
            request({url:url,json:true},(error,{body} = {}) => {
            if(error){
                callback("Unable to connect to the server!")
            }
            else{
                const forecast = 'It is ' + body.current.temperature + ' degrees but it feels like ' + body.current.feelslike + ' degrees. Chances of rain is ' + body.current.precip + '%.';
                callback(undefined,{
                    place:place_name,
                    forecast:forecast
                })
            }
         })
        }
    })
  
}

module.exports = {
    forecast:forecast,
}