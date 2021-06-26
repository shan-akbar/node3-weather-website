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
                feels_like_temp: body.current.feelslike,
                observation_time: body.current.observation_time,
                wind_speed: body.current.wind_speed,
                wind_dir: body.content.wind_dir,
                pressure: body.content.pressure,
                humidity:body.current.humidity,
                cloudcover:body.current.cloudcover,
                uv_index:body.current.uv_index,
                visibility:body.current.visibility,
                is_day:body.current.is_day
            })
        }
    })
}

module.exports = forecast