const routes = require("express").Router();
const authController = require("../controllers/authController");

routes.post("/register", authController.handleRegister);
routes.post("/login", authController.handleLogin);
routes.get("/logout", authController.handleLogout);
routes.get("/refresh", authController.verifyRefreshToken);

module.exports = routes;
