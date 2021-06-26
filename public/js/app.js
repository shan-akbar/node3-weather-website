const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    const url = '/weather?search=' + location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.Forecast.weather_desc + ', It is ' + data.Forecast.temp + 
            ' degrees out there, but it feels like ' + data.Forecast.feels_like_temp + ' degrees.' +
            ' There are ' + data.Forecast.rain_prob + '% chance of rain.'
        }
    })
})
})