// Required node modules
const express = require('express');
const path = require('path');
const hbs = require('hbs');
// Required Scripts for API
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// Express Node App Creation
const app = express()
// Port setting through env variables
const port = process.env.PORT || 3000
//Define the path for the Express Server configuration (Main File path)

// Public Directory Path
const pubDirPath = path.join(__dirname, '../public')
// hbs Views Path
const viewsPath = path.join(__dirname, '../templates/views')
// hbs partials Path
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(pubDirPath))
// Setup hbs engine and views location (Dynamic content)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serving the pages

// Homepage
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

// Fetching data through weather API
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is Required'
        })
    }
    geocode(req.query.address, (error, { long, lat, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecastData
            })
        })
    })
})

// // 404
// app.get('*', (req, res) => {
//     res.render('error', {
//         title: '404',
//         err_msg: 'Error 404'
//     })
// })

// Start the Server
app.listen(port, () => {
    console.log('Server is up')
})