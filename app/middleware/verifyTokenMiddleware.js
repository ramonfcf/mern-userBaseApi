const JwtServiceClass = require("../services/jwtService");
const jwtService = new JwtServiceClass();

const verifyToken = (req, res, next) => {
  try {
    jwtService.verifyToken(req, res, next);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyToken;
