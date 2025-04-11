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
        let prod = model.getOneById(req.params.id);
        res.render("product-details", { prod: prod, title: 'Product #' + req.params.id});
    } catch (err) {
        console.error("Error while getting products ", err.message);
        next(err);
    }
}

