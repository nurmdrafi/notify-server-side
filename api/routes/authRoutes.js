const routes = require("express").Router();
const authController = require("../controllers/authController");

routes.post("/token", authController.authenticate);

module.exports = routes;
