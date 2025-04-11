"use strict";
const express = require("express");
const router = express.Router();

const prodController = require("../controllers/products.controller");

router.get("/all", prodController.getAll);

router.get("/", prodController.getAllByOneAttribute);

router.get("/:id", prodController.getOneById);

router.delete("/delete/:id", prodController.deleteGame)

router.post("/add", gamesController.createNew);

module.exports = router;