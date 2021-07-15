const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates'))
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('views/index', {
        title: 'weather app',
        name: 'Nitin'
    });
});

app.get('/about', (req, res) => {
    res.render('views/about', {
        title: 'About Me!',
        name: 'Nitin'
    });
});

app.get('/help', (req, res) => {
    res.render('views/help', {
        title: 'Help',
        name: 'Nitin'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    console.log('here');
    if(!address){
        return res.send({error: "Address field is missing"});
    }
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({error});
            }
            res.send({forecast: data, location, address});
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('views/404', {
        message: 'Help Page not found',
        title: 'Help',
        name: 'Nitin'
    });
});

app.get('*', (req, res) => {
    res.render('views/404', {
        message: 'Page Not Found',
        title: 'Oops!',
        name: 'Nitin'
    });
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})