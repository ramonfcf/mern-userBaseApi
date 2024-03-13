require("dotenv").config();
// const connectToMongoDB = require("./db/setupDb");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("./middleware/loggerMiddleware");
const cors = require("cors");

const usersRoutes = require("./routes/v1/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/verifyTokenMiddleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use(
  "/api/v1/users",
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
  verifyToken,
  usersRoutes
);
app.use(
  "/auth/",
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
  authRoutes
);

const port = process.env.LISTENING_PORT;

const connectToMongoDB = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    await callback();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

connectToMongoDB(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})

module.exports = app;