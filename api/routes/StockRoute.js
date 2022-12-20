"use strict";
module.exports = function (app) {
	var product = require("../controllers/StockController");
	app.route("/productos").get(product.getAllStock).post(product.getFilterStock);

	app.route("productos/:productId")
		.put(product.updateProduct)
		.delete(product.deleteProduct);
	app.route("/productos/find").post(product.findProduct);
	app.route("/productos/findDeleted").post(product.findDeletedProducts);
	app.route("/productos/add").post(product.addProduct);
	app.route("/productos/addMany").post(product.addManyProducts);
	app.route("/login").post(product.loginUser);
};
