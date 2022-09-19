const routes = require("express").Router();
const authController = require("../controllers/authController");

routes.post("/token", authController.authenticate);
routes.post("/refresh", authController.verifyRefresh);

module.exports = routes;
