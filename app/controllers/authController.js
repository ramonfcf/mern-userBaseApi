const JwtServiceClass = require("../services/jwtService");
const jwtService = new JwtServiceClass();

const login = (req, res) => {
  try {
    jwtService.login(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
