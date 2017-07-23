const express = require('express')
const mongoose = require('mongoose')
const app = express();
const routes = require('./routers/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost/QuizAppDB");
// mongoose.connect("mongodb://nazeer:mojojojo3@ds127802.mlab.com:27802/quizappdb")
mongoose.connect("mongodb://quiz:quiz123@ds117913.mlab.com:17913/quizapplication")

app.use(express.static(path.resolve(__dirname, './client/', 'build')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/', 'build', 'index.html'));
});


module.exports = app;
