/*  REQUIRE  */
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

/* Extra file option */
const fs = require('fs');

/*  File upload */
const multer = require('multer');
const upload = multer({
  dest: 'public/files'
});

/*  DB  */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apple_location');
var db = mongoose.connection;

/*  Routes REQUIRE  */
const data = require('./routes/location-data');
const map = require('./routes/location-map');

var app = express();

/*  Middleware  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*  set Public Folder to access ressources  */
app.use(express.static(path.join(__dirname, 'public')));

/*  Route setters */
app.use('/api/data', data);
app.use('/api/map', map);

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

// 404 Page
app.use((req, res, next) => {
    res.status(404).send("Use /api/data or /api/map to access some datas")
});

app.listen(3000);
console.log('====================================');
console.log('App running on port 3000');
console.log('====================================');

module.exports = app