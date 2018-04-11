const csv = require('fast-csv');
const mongoose = require('mongoose');

var locationData = require('../models/locationData');

function csvParser() { 

    this.parseFile = (filePath) => {
        return new Promise((resolve, reject) => {
            var result = [];
            csv
                .fromPath(filePath, {
                    headers: true,
                    ignoreEmpty: true
                })
                .on("data-invalid", (data) => {
                    reject("Rejected: csv invalid data");
                })
                .on('data', (data) => {
                    data['_id'] = new mongoose.Types.ObjectId();
                    result.push(data);
                })
                .on('end', () => {
                    resolve(result);
                })
        })
    }

    this.parseBigFile = (filePath) => {
        return new Promise((resolve, reject) => {
            var result = [];
            csv
                .fromPath(filePath, {
                    headers: true,
                    ignoreEmpty: true
                })
                .on("data-invalid", (data) => {
                    reject("Rejected: csv invalid data");
                })
                .on('data', (data) => {
                    data['_id'] = new mongoose.Types.ObjectId();
                    locationData.create(data);
                })
                .on('end', () => {
                    resolve(result);
                })
        })
    }

};

module.exports = csvParser;
