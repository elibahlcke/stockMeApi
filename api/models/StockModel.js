'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new mongoose.Schema({
    code: { type: String},
    categoria: { type: String},
    descripcion: {type: String},
    color: { type: String},
    talle: { type: String},
    genero: {type: String},
    fecha: {type: Date, default: Date.now},
    precio: { type: Number},
    cantidad: { type: Number},
    deletedOn: {type: Date}
});

const Products = mongoose.model("Products", ProductsSchema)
module.exports = Products;