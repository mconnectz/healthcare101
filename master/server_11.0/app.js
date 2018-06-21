var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan'); 
var pres = require('./diagnosis');
var any = require('./labpharm');
var pat = require('./router');
var db = "mongodb://admin:admin123@ds251598.mlab.com:51598/healthcare";
var app = express();
var path = require('path');

mongoose.connect(db,(err) => {
    if (err) {
      console.log('Could not connect to database');
    } else {
      console.log('Rock On');
    }
});

app.listen(process.env.PORT || 3000);
app.use(bodyParser.json({limit: '50mb'})); // augmenter limit du payload
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(morgan('dev')); 
app.use('/',pres);
app.use('/patients',any);

app.use('/',pat);
app.use('/',require('./router'));
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
