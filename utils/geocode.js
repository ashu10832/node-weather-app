const request = require('request')



const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNodTEwODMyIiwiYSI6ImNrYWRxNnZiNzFzcDUyeXA0YWRucTN2Z2sifQ.fWOFrH0Gn00zhdHKz7CrOQ'
    request({url:url,json:true},(error,response) => {
    if(error){
        callback("Unable to connect to the location server!")
    } else if(response.body.features.length <= 1){
        callback("Couldn't understand the location!")
    } else{
        callback(undefined,{
            place_name:response.body.features[0].place_name,
            lat:response.body.features[0].center[1],
            lon:response.body.features[0].center[0]
        })
    }
 })

}

module.exports = {
geocode:geocode,
}