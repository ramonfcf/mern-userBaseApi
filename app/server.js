require("dotenv").config();
const connectToMongoDB = require("./db/setupDb");

const express = require("express");
const logger = require("./middleware/loggerMiddleware");
const cors = require("cors");

const usersRoutes = require("./routes/v1/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/verifyTokenMiddleware");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1/users", cors(), usersRoutes);
app.use("/auth/", cors(), authRoutes);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req, res) =>
  res.json({
    message: "Welcome to the API",
  })
);
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
