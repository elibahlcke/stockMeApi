'use strict';
var mongoose = require('mongoose'),
Products = mongoose.model('Products');

exports.loginUser = function (req, res) {
    if (req.body.username === "toska" && req.body.password === "eliana2022") {
        res.send({
            token: 'fernandotieneunemail'
        });
    };
    throw new Error("Wrong credentials");
}
exports.getAllStock  = function (req, res) {
    Products.find({}, function (err, product) {
        if (err) res.send(err);
        res.json(product);
    });
};

exports.addProduct = function (req, res) {
    var newProduct = new Products(req.body);
    newProduct.save(function (err, product) {
        if (err) res.send(err);
        res.json(product);
    });
};

exports.findProductByCode = function (req, res) {
    Products.find({code: { $eq: req.params.productCode} }, function (err, product){
        if (err) res.send(err);
        res.json(product);
    })
};

exports.updateProduct = function (req, res) {
    Products.findOneAndUpdate({_id: req.arams.productId}, req.body, {new: true}, function (err, product) {
        if (err) res.send(err);
        res.json(product);
    });
};


exports.deleteProduct = function (req, res) {
    Products.remove({_id: req.params.productId}, function (err, product) {
        if (err) res.send(err);
        res.json({message: 'Borrado Exitosamente!'});
    });
};
