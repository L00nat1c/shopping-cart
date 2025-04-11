"use strict";
const db = require("./db-conn");

function getAll() {
    let sql = "SELECT * FROM Products;";
    const data = db.all(sql, value);
    return data;
}

function getAllByOneAttribute(attribute, value) {
    const validColumns = getColumnNames();
    if(validColumns.incudes(attribute)) {
        let sql = "SELECT * FROM Products WHERE " + attribute + "=? ;";
        const data = db.all(sql, value);
        return data;
    }
}

function getOneById() {
    let sql = "SELECT * FROM Products WHERE id = ? ;";
    const item = db.get(sql, id);
    return item;
}

function deleteProduct(id) {
    let sql = "DELETE FROM Products WHERE id = ? ;";
    const info = db.run(sql, id);
    return info;
}

module.exports = {
    getAll,
    getAllByOneAttribute,
    getOneById,
    deleteProduct
};