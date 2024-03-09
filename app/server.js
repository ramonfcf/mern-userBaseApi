require("dotenv").config();
const connectToMongoDB = require("./db/setupDb");

const express = require("express");
const logger = require("./middleware/loggerMiddleware");

const usersRoutes = require("./routes/v1/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/verifyTokenMiddleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1/users", verifyToken, usersRoutes);
app.use("/auth/", authRoutes);

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
