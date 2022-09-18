const routes = require("express").Router(),
  userRoutes = require("./userRoutes"),
  noteRoutes = require("./noteRoutes"),
  authRoutes = require("./authRoutes");

routes.use("/user", userRoutes);
routes.use("/note", noteRoutes);
routes.use("/auth", authRoutes);

module.exports = routes;
