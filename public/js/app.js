const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const messageSeven = document.querySelector('#message-7')
const messageEight = document.querySelector('#message-8')
const messageNine = document.querySelector('#message-9')
const messageTen = document.querySelector('#message-10')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value

    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    messageSeven.textContent = ''
    messageEight.textContent = ''
    messageNine.textContent = ''
    messageTen.textContent = ''

    const url = '/weather?search=' + location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Forecast.weather_desc + ', It is ' + data.Forecast.temp + 
            ' degrees out there, but it feels like ' + data.Forecast.feels_like_temp + ' degrees.'
            messageThree.textContent = 'Observation time: '+data.Forecast.observation_time
            messageFour.textContent = 'Wind speed: '+data.Forecast.wind_speed+' km/h'
            messageFive.textContent = 'Wind pressure: '+data.Forecast.pressure+ ' milibar' 
            messageSix.textContent = 'Wind diection: '+data.Forecast.wind_direction
            messageSeven.textContent = 'Humidity: '+data.Forecast.humidity+ '%'
            messageEight.textContent = 'Cloud cover: '+data.Forecast.cloudcover+ '%'
            messageNine.textContent = 'Visibility range: '+data.Forecast.visibility+' km'
            messageTen.textContent = 'Day time: '+data.Forecast.is_day
        }
    })
})
})