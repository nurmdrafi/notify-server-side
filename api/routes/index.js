const routes = require("express").Router(),
  userRoutes = require("./userRoutes"),
  noteRoutes = require("./noteRoutes"),
  authRoutes = require("./authRoutes"),
  imageRoutes = require("./imageRoutes");

routes.use("/user", userRoutes);
routes.use("/note", noteRoutes);
routes.use("/auth", authRoutes);
routes.use("/file", imageRoutes);

module.exports = routes;
