const path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.config();

const aylien = require("aylien_textapi");
// set aylien API credentias
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

const app = express()

app.use(express.static('dist'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/sentiments', appGetSentiments);

function appGetSentiments(req, res) {
    textapi.sentiment({
        'text': req.query.text
        }, function(error, response) {
        if (error === null) {
            res.send(response);
        }
    });
}

app.get('/classify', appGetClassify);

function appGetClassify(req, res) {
    textapi.classify({
        'text': req.query.text
        }, function(error, response) {
        if (error === null) {
            res.send(response);
        }
    });
}
// designates what port the app will listen to for incoming requests
app.listen(8050, function () {
    console.log('Example app listening on port 8050!')
})

