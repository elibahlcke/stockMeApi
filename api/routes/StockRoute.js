"use strict";
module.exports = function (app) {
	var product = require("../controllers/StockController");
	app.route("/productos").get(product.getAllStock).post(product.getFilterStock);

	app.route("/productos/producto").post(product.updateProduct);
	app.route("/productos/delete").post(product.deleteProduct);
	app.route("/productos/find").post(product.findProduct);
	app.route("/productos/findDeleted").post(product.findDeletedProducts);
	app.route("/productos/add").post(product.addProduct);
	app.route("/productos/remove").post(product.removeStock);
	app.route("/productos/addMany").post(product.addManyProducts);
	app.route("/productos/historial").get(product.findDeletedProducts);
	app.route("/login").post(product.loginUser);
};
