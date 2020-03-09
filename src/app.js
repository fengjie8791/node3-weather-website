const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilis/geocode.js');
const forecast = require('./utilis/forecast.js');

const app = express();

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jie Feng'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jie Feng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a helpful message!',
        name: 'Jie Feng'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "error message no address"
        })
    }

    geocode(req.query.address, (error , { latitude, longitude, location } ={}) => {
        if(error) {
            return res.send({error})
        }
       
        forecast(latitude, longitude, ( error, forcastData ) => {
            if(error){
                res.send({error})
            }
             res.send({ address:req.query.address,
                        location, 
                        forcastData: forcastData
             })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: "error message"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404-help',
        error: '404 error! no article found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: '404 error!'
    })
})

app.listen(3000, () => {
    console.log('server os up on port 3000')
})