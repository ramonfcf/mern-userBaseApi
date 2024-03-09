require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/v1/usersRoutes");
const logger = require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1/users", usersRoutes);

const port = process.env.LISTENING_PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });