"use strict";

const express = require("express");
const app = express();
const ejs = require("ejs");

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const prodRoutes = require("./routes/products.route");
const { db_close } = require("./models/db-conn");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/ejs");

app.use("products", prodRoutes);

app.get("/", (req, res) => {
    res.redirect("/products/all");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function() {
    console.log("App listening at https://localhost:" + PORT);
});

process.on("SIGINT", cleanup);
function cleanup() {
    console.log("Terminate signal received.");
    db_close();
    console.log("...Closing HTTP server.");
    server.close(() => {
        console.log("HTTP srver closed.")
    })
}