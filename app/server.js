require("dotenv").config();

const express = require("express");
const usersRoutes = require("./routes/v1/users");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(`${timestamp} - |${req.method}| '${req.path}'`);
  next();
});

const port = process.env.LISTENING_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/v1/users", usersRoutes);