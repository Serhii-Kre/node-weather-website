const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express
const publicDirectoryPath = path.join(__dirname, '../../public/')
const viewDirectoryPath = path.join(__dirname, '../templates/views/')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
      title: 'Weather application',
      name: 'Serhii Krechmarovskyi'
  })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
      return res.send ({
          error: 'please enter the address'
      })
    }


    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {

        if(error) {
            return res.send ({ error })
        }
      
          forecast(latitude,longitude, (error, forecastData) => {
      
            if(error) {
                return res.send ({ error })
            }
      
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
          })
      })


    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather application',
        name: 'Serhii Krechmarovskyi',
        errorMessage: 'help article is not found'
       })
})

app.get('*', (req, res) => {
    res.render('404', {
    title: 'Weather application',
    name: 'Serhii Krechmarovskyi',
    errorMessage: 'the page is not found'
   })
})

app.listen(port, () => {
    console.log('server is running')
})