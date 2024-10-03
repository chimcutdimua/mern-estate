require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
