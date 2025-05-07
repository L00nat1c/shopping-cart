"use strict";
const model = require("../models/products.model");

function getAll(req, res, next) {
    try {
        let prodList = model.getAll();
        res.render("products", { prodList: prodList, title: "All products"});
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

function getAllByOneAttribute(req, res, next) {
    let attribute = req.query.attribute;
    let value = req.query.value;
    if (attribute && value) {
        try {
            let prodList = model.getAllByOneAttribute(attribute, value);
            res.render("products", { prodList: prodList, title: value + " Products "});
        } catch (err) {
            console.error("Error while getting products ", err.message);
        next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function getOneById(req, res, next) {
    try {
        let prod = model.getOneById(req.params.prodId);
        res.render("product-details", { prod: prod, title: 'Product #' + req.params.prodId});
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

function deleteProduct(req, res, next) {
    try {
        model.deleteProduct(req.params.id);
        res.render("products", { prodList: model.getAll(), title: "All Products" });
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

function createNew(req, res, next) {
    let prodName = req.body.prodName;
    let prodDesc = req.body.prodDesc;
    let imgUrl = req.body.imgUrl;
    let price = req.body.price;
    let catId = req.body.catId;

    if(prodName && prodDesc && imgUrl && price && catId) {
        let params = [prodName, prodDesc, imgUrl, price, catId];
        try {
            model.createNew(params);
            res.render("products", { prodList: model.getAll(), title: "All Products"});
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}


module.exports = {
    getAll,
    getAllByOneAttribute,
    getOneById,
    deleteProduct,
    createNew
};
