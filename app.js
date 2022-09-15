require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* ================
 app configuration
================ */
const app = express();
// use middleware
app.use(cors());
app.use(express.json());

/* ================
 mongodb configure
================ */

const database = process.env.MONGO_URI;
const mongooseOptions = {
  useNewUrlParser: true,
};
mongoose.connect(database, mongooseOptions, (error) => {
  if (error) {
    console.log("DB connection failed");
  } else {
    console.log("DB connected");
  }
});

/* ================
      routes
================ */
const routes = require("./api/routes");
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
