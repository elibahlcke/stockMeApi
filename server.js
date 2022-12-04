var express = require('express'),
 app = express(),
 port = process.env.PORT || 3000,
 mongoose = require('mongoose'),
 Products = require('./api/models/StockModel'),
 bodyParser = require('body-parser');

 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost/miinstanciadb');

 app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());
 var routes = require('./api/routes/StockRoute');
 

app.listen(port);
console.log('server running on' + port);