"use strict";
module.exports = function (app) {
	var product = require("../controllers/StockController");
	app.route("/productos").get(product.getAllStock).post(product.getFilterStock);

	app.route("/productos/producto").post(product.updateProduct);
	app.route("/productos/delete").post(product.deleteProduct);
	app.route("/productos/find").post(product.findProduct);
	app.route("/productos/findDeleted").post(product.findDeletedProducts);
	app.route("/productos/entryDates").post(product.findEntryDates);
	app.route("/productos/add").post(product.addProduct);
	app.route("/productos/remove").post(product.removeStock);
	app.route("/productos/addMany").post(product.addManyProducts);
	app
		.route("/productos/historial")
		.get(product.getHistory)
		.post(product.findDates);
	app
		.route("/productos/entradas")
		.get(product.getEntradasHistory)
		.post(product.findEntryProducts);
	app.route("/productos/entrada").post(product.addStock);
	app.route("/login").post(product.loginUser);
};
