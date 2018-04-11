const mongoose = require('mongoose');

// Map Schema
var locationMapSchema = mongoose.Schema({
    locationID:{
        type: String,
        required: true
    },
    locationName:{
        type: String,
        required: true
    }
});

var LocationMap = module.exports = mongoose.model('LocationMap', locationMapSchema);

// Get All Map
module.exports.getLocationMap = (callback, limit) => {
    return new Promise((resolve, reject) => {
        LocationMap.find((err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res);
        }).limit(limit);
    })
};

// Add Map
module.exports.addLocationMap = (locationMap) => {
    return new Promise((resolve, reject) => {
        LocationMap.create(locationMap, (err, documents) => {
            if (err) {
                reject(err)
            }
            resolve(locationMap.length);
        });
    })
}