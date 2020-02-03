var path = require('path')
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');

dotenv.config();

var aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

textapi.sentiment({
    'text': 'John is a very good football player!'
    }, function(error, response) {
    if (error === null) {
        console.log(response);
    }
});

const app = express()

app.use(express.static('dist'))
app.use(cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8050, function () {
    console.log('Example app listening on port 8050!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

