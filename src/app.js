const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define paths for ecpress config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Shan Akbar'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Shan Akbar',
        desc: 'Created by Shan Akbar'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Shan Akbar',
        helpText: 'Enter name of your city in the search bar,'+
        ' and press enter or click search butoon to get weather forecast.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please enter a location'
        })
    }
    address = req.query.search
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                Forecast: forecastData,
                Location: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404',{
        title: '404',
        name:'Shan Akbar',
        errorText: 'This help article is not available.'
    })
})


app.get('*', (req, res) => {
    res.render('error404',{
        title: '404',
        name:'Shan Akbar',
        errorText: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})