const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a44acd58b9643369fa46ad0110511c9&query='+longitude+','+latitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weatherstack service', undefined);
        }else if(body.error) {
            callback('No search result found. Try with different location!', undefined);
        }else{
            callback(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`);
        }
    });
};

module.exports = forecast;
