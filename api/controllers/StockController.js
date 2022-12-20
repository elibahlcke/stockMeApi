"use strict";
var mongoose = require("mongoose");
const productModel = require("../models/StockModel");

exports.loginUser = function (req, res) {
	if (req.body.username === "toska" && req.body.password === "eliana2022") {
		res.send({
			token: "fernandotieneunemail"
		});
	}
};
exports.getAllStock = function (req, res) {
	productModel.find({}, function (err, product) {
		if (err) res.send(err);
		res.json(product);
	});
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
	productModel.find({ deletedOn: { $ne: null } }, function (err, product) {
		if (err) res.send(err);
		res.json(product);
	});
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
	productModel.find({ categoria: req.body.value }, function (err, product) {
		if (err) res.send(err);
		res.json(product);
	});
};

exports.updateProduct = function (req, res) {
	productModel.findOneAndUpdate(
		{ _id: req.params.productId },
		req.body,
		{ new: true },
		function (err, product) {
			if (err) res.send(err);
			res.json(product);
		}
	);
};

exports.deleteProduct = function (req, res) {
	productModel.remove({ _id: req.params.productId }, function (err, product) {
		if (err) res.send(err);
		res.json({ message: "Borrado Exitosamente!" });
	});
};
