'use strict';
module.exports = function (app) {
    var product = require('../controllers/StockController');
    app.route('/productos')
    .get(product.getAllStock)
    .post(product.addProduct);

    app.route('productos/:productId')
        .get(product.findProductByCode)
        .put(product.updateProduct)
        .delete(product.deleteProduct);
    
    app.route('/login')
        .post(product.loginUser)
};