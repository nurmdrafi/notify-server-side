const routes = require("express").Router();
const authController = require("../controllers/authController");

routes.post("/token", authController.getToken);
routes.get("/refresh", authController.verifyRefreshToken);

module.exports = routes;
