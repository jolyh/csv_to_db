const csv = require('fast-csv');
const mongoose = require('mongoose');

var locationMap = require('../models/locationMap');
var locationData = require('../models/locationData');

//var map = mongoose.model('locationMap');

function csvParser() { 

    this.parseFile = (filePath) => {
        return new Promise((resolve, reject) => {
            var result = [];
            csv
                .fromPath(filePath, {
                    headers: true,
                    ignoreEmpty: true
                })
                .on("data-invalid", function(data){
                    reject("Rejected: csv invalid data");
                })
                .on('data', (data) => {
                    data['_id'] = new mongoose.Types.ObjectId();
                    result.push(data);
                })
                .on('end', () => {
                    //console.log(result);
                    resolve(result);
                })
        })
    }

};

module.exports = csvParser;
