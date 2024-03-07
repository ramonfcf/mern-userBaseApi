require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.LISTENING_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("First path!");
});
