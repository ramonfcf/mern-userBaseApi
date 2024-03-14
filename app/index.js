require("dotenv").config();
const connectToMongoDB = require("./db/setupDb");

const express = require("express");
const logger = require("./middleware/loggerMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const verifyToken = require("./middleware/verifyTokenMiddleware");

const usersRoutes = require("./routes/v1/usersRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1/users", corsMiddleware, verifyToken, usersRoutes);
app.use("/auth/", corsMiddleware, authRoutes);

const port = process.env.LISTENING_PORT;

connectToMongoDB(() => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
});

module.exports = app;
