const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "get all users" });
});

router.post("/", (req, res) => {
  res.json({ message: "create user" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `get user with id ${req.params.id}` });
});

router.patch("/:id", (req, res) => {
  res.json({ message: `update user with id ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `delete user with id ${req.params.id}` });
});

module.exports = router;
