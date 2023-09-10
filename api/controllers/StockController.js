"use strict";
var mongoose = require("mongoose");
require("date-utils");
const productModel = require("../models/StockModel");
const salidasModel = require("../models/SalidasModel");
const entradasModel = require("../models/EntradasModel");

exports.loginUser = function (req, res) {
	if (req.body.username === "toska" && req.body.password === "eliana2022") {
		res.send({
			token: "fernandotieneunemail"
		});
	}
};

//get all products section
exports.getAllStock = function (req, res) {
	productModel.find(
		{ deletedOn: { $eq: "1970-01-01T00:00:00.000+00:00" } },
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

//get all salidas section
exports.getHistory = function (req, res) {
	salidasModel.find({}, function (err, product) {
		if (err) res.send(err);
		res.json(product);
	});
};

//get all entradas section
exports.getEntradasHistory = function (req, res) {
	entradasModel.find({}, function (err, product) {
		if (err) res.send(err);
		res.json(product);
	});
};

//add new product or several
exports.addProduct = function (req, res) {
	const product = productModel.create(req.body);
	res.send(product);
};
exports.addManyProducts = function (req, res) {
	for (const i in req.body.products) {
		productModel.create(i);
	}
	res.send(true);
};

//find productsfor salidas historial
exports.findDeletedProducts = function (req, res) {
	salidasModel.find(
		{
			$or: [
				{ code: { $regex: new RegExp(req.body.value), $options: 'i' } },
				{ descripcion: { $regex: RegExp(`${req.body.value}`), $options: 'i' } }
			]
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

//find products for entradas section
exports.findEntryProducts = function (req, res) {
	entradasModel.find(
		{
			$or: [
				{ code: { $regex: new RegExp(req.body.value), $options: 'i' } },
				{ descripcion: { $regex: RegExp(`${req.body.value}`), $options: 'i' } }
			]
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};
//find some product by code/description
exports.findProduct = function (req, res) {
	productModel.find(
		{
			$or: [
				{ code: { $regex: new RegExp(req.body.value), $options: 'i' }, deletedOn: { $eq: "1970-01-01T00:00:00.000+00:00" }  },
				{ descripcion: { $regex: RegExp(`${req.body.value}`), $options: 'i' }, deletedOn: { $eq: "1970-01-01T00:00:00.000+00:00" } }
			]
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

//filter products by category
exports.getFilterStock = function (req, res) {
	productModel.find(
		{
			categoria: req.body.value,
			deletedOn: { $eq: "1970-01-01T00:00:00.000+00:00" }
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};
//update product data
exports.updateProduct = function (req, res) {
	productModel.findOneAndUpdate(
		{ _id: req.body.id },
		req.body.filter,
		{ new: true },
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

//mark product as deleted
exports.deleteProduct = function (req, res) {
	let array = [];
	req.body.products.forEach((item) => {
		productModel.findByIdAndUpdate(
			item,
			{ deletedOn: Date.today() },
			function (err, products) {
				if (err) {
					console.log(err);
				} else {
					array = [...array, products];
				}
			}
		);
	});
	res.json(array);
};
//changes stock value to less and add it to history
exports.removeStock = function (req, res) {
	let difference = req.body.prevValue - req.body.filter.cantidad;
	if (difference >= 0) {
		productModel.findOneAndUpdate(
			{ _id: req.body.id },
			req.body.filter,
			{ new: true },
			function (err, product) {
				if (err) res.send(err);
				salidasModel.create({
					fecha: new Date(),
					cantidad: difference,
					producto: req.body.id,
					code: req.body.code,
					descripcion: req.body.descripcion,
					talle: req.body.talle,
					color: req.body.color
				});
				res.json(product);
			}
		);
	} else throw new Error("No hay mas cantidad para descontar");
};

//add stock and add it to entries history
exports.addStock = function (req, res) {
	let difference = req.body.filter.cantidad - req.body.prevValue;
	productModel.findOneAndUpdate(
		{ _id: req.body.id },
		req.body.filter,
		{ new: true },
		function (err, product) {
			if (err) res.send(err);
			entradasModel.create({
				cantidad: difference,
				fecha: new Date(),
				producto: req.body.id,
				code: req.body.code,
				descripcion: req.body.descripcion,
				talle: req.body.talle,
				color: req.body.color
			});
			res.json(product);
		}
	);
};
//find salidas history between dates
exports.findDates = function (req, res) {
	salidasModel.find(
		{
			fecha: {
				$gte: new Date(req.body.from),
				$lt: new Date(req.body.to)
			}
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

//find entradas history between dates
exports.findEntryDates = function (req, res) {
	console.log(req.body);
	entradasModel.find(
		{
			fecha: {
				$gte: new Date(req.body.from),
				$lt: new Date(req.body.to)
			}
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};
