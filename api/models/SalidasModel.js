'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalidasSchema = new mongoose.Schema({
    cantidad: {type: Number},
    fecha: {type: Date, default: Date.now},
    producto: { type: String},
    codigo: { type: String},
    descripcion: { type: String}
});

const Salidas = mongoose.model("Salidas", SalidasSchema)
module.exports = Salidas;