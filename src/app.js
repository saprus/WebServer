// Siddhant Sapru
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express() // 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')


//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs') // this is how you HAVE to define it --> to enable hbs template
hbs.registerPartials(partialsPath) // contains the path that handlebars module needs


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// res.send --> prints the output on the screen directly
// res.render --> looks for the file specified in the "views" directory, and you can give keys & values

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siddhant Sapru'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Siddhant Sapru'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Siddhant Sapru',
        issue: 'Please contact support'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error : error
            })
        }
        
        forecast(data.latitute, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : error
                })
            }
            else {
                return res.send({
                    forecast: forecastData,
                    location: data.location,
                    address: req.query.address
               })
            }
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // removing the "return res.send" above will throw an error 
    // this error means that you cannot res.send two things (one is above and one is below) back to the server 
    // by adding return to the res.send, we basically just res.send only one of the two res.send statements

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddhant Sapru',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddhant Sapru',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})