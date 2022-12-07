'use strict';
module.exports = function (app) {
    var product = require('../controllers/StockController');
    app.route('/products')
    .get(product.getAllStock)
    .post(product.addProduct);

    app.route('products/:productId')
        .get(product.findProductByCode)
        .put(product.updateProduct)
        .delete(product.deleteProduct);
    
    app.route('/login')
        .post(product.loginUser)
};