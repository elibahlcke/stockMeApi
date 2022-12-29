'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntradasSchema = new mongoose.Schema({
    cantidad: {type: Number},
    fecha: {type: Date, default: Date.now},
    producto: { type: String},
    code: { type: String},
    descripcion: { type: String},
    talle: { type: String},
    color: { type: String}

});

const Entradas = mongoose.model("Entradas", EntradasSchema)
module.exports = Entradas;