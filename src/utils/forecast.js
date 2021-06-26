const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url= 'http://api.weatherstack.com/current?access_key=0449aad7267350f58fa3ccddd9a5c1bd&query='+longitude+','+latitude+'&units=m'
    request({ url, json: true},(error, {body} = {})=>{
        if (error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Please enter a valid location!', undefined)    
        }else{
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feels_like_temp: body.current.feelslike
            })
        }
    })
}

module.exports = forecast