const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    res.send({
        forecast: '50 degrees',
        location: 'Delhi'
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