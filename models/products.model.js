"use strict";
const db = require("./db-conn");

function getAll() {
    let sql = "SELECT * FROM products;";
    const data = db.all(sql, value);
    return data;
}

function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if(validColumns.incudes(attribute)) {
        let sql = "SELECT * FROM products WHERE " + attribute + "=? ;";
        const data = db.all(sql, value);
        return data;
    }
}

function getOneById() {
    let sql = "SELECT * FROM products WHERE prodId = ? ;";
    const item = db.get(sql, id);
    return item;
}

function deleteProduct(id) {
    let sql = "DELETE FROM products WHERE prodId = ? ;";
    const info = db.run(sql, id);
    return info;
}

function createNew(params) {
    let sql = "INSERT INTO products " + "VALUES(?, ?, ?, ?, ?); ";
    const info = db.run(sql, params);
    return info;
}

module.exports = {
    getAll,
    getAllByOneAttribute,
    getOneById,
    deleteProduct,
    createNew
};
