"use strict";
module.exports = function (app) {
	var product = require("../controllers/StockController");
	app.route("/productos").get(product.getAllStock).post(product.getFilterStock);

	app.route("productos/:productId")
		.put(product.updateProduct)
		.delete(product.deleteProduct);
	app.route("/productos/find").post(product.findProduct);
	app.route("/login").post(product.loginUser);
};
