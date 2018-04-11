const mongoose = require('mongoose');

// Map Schema
var locationDataSchema = mongoose.Schema({
    locationID:{
        type: String,
        required: true
    },
    time:{
        type: Date
    },
    AtmosphericPressure:{
        type: Number
    },
    WindDirection:{
        type: Number
    },
    WindSpeed:{
        type: Number
    },
    Gust:{
        type: Number
    }
});

var LocationData = module.exports = mongoose.model('LocationData', locationDataSchema);

// Get All Map
module.exports.getLocationData = (limit) => {
    return new Promise((resolve, reject) => {
        LocationData.find((err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res);
        }).limit(limit);
    })
};

// Add Map
module.exports.addLocationData = (locationData) => {
    return new Promise((resolve, reject) => {
        LocationData.create(locationData, (err, documents) => {
            if (err) {
                reject(err)
            }
        })
        resolve(locationData.length);
    })
}