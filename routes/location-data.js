const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('fast-csv');

const csvParser = require('../lib/csv-parser');
const parser = new csvParser();

const router = express.Router();

var locationData = require('../models/locationData');

const filePath = './public/files/locationData.csv';

// get result from db
router.get('/', (req, res) => {
    locationData.getLocationData()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        })
})

// parse and insert result in db
router.get('/parse', (req, res) => {
    if (!fs.existsSync(filePath)){
        res.send("No corresponding csv file found");
    } else {
        parser.parseBigFile(filePath)
            .then((result) => {
                res.send(result + " successfully added");
            })
            .catch((err) => {
                res.json(err);
            })
    }
})

// empty collection
router.get('/empty', (req, res) => {
    locationData.emptyCollection()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        })
})

module.exports = router;