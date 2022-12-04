'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    _id: { type: Number },
    codigo: { type: String},
    color: { type: String},
    talle: { type: String},
    precio: { type: Number},
    cantidad: { type: Number},
    fecha: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Products', ProductsSchema);