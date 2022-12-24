"use strict";
var mongoose = require("mongoose");
require("date-utils");
const productModel = require("../models/StockModel");
const salidasModel = require("../models/SalidasModel");

exports.loginUser = function (req, res) {
	if (req.body.username === "toska" && req.body.password === "eliana2022") {
		res.send({
			token: "fernandotieneunemail"
		});
	}
};
exports.getAllStock = function (req, res) {
	productModel.find(
		{ deletedOn: { $eq: "1970-01-01T00:00:00.000+00:00" } },
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

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
exports.findDeletedProducts = function (req, res) {
	salidasModel.find(
		{
			$or: [
				{ code: { $regex: new RegExp(req.body.value) } },
				{ descripcion: { $regex: RegExp(`${req.body.value}`) } }
			]
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

exports.findProduct = function (req, res) {
	productModel.find(
		{
			$or: [
				{ code: { $regex: new RegExp(req.body.value) } },
				{ descripcion: { $regex: RegExp(`${req.body.value}`) } }
			]
		},
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

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

exports.deleteProduct = function (req, res) {
	let array = [];
	req.body.products.forEach((item) => {
		console.log(item, Date.today());
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
					fecha: Date.now(),
					cantidad: difference,
					producto: req.body.id,
					codigo: req.body.code,
					descripcion: req.body.descripcion
				});
				res.json(product);
			}
		);
	} else throw new Error("No hay mas cantidad para descontar");
};
