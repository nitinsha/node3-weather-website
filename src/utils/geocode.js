const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoibml0aW5ycGwiLCJhIjoiY2tyMWpweW1oMW5ueDJ0cGxoYmdsbHFqZCJ9.9AUidJP9NZbOpDESMjg8Hg&limit=1";
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Geocode service', undefined);
        }else if(!body.features || body.features.length === 0) {
            callback('No search result found. Try with different location!', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });

        }
    });
};

module.exports = geocode;
