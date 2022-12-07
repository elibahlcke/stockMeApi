var express = require('express'),
   cors = require('cors'),
 app = express(),
 port = process.env.PORT || 8000,
 mongoose = require('mongoose'),
 Products = require('./api/models/StockModel'),
 bodyParser = require('body-parser');

 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://127.0.0.1/miinstanciadb');
 app.use(cors());

 app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());
 var routes = require('./api/routes/StockRoute');
routes(app);

app.listen(port);
console.log('server running on' + port);