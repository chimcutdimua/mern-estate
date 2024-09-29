require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
