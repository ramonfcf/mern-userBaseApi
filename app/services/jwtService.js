class JwtService {
  constructor() {
    this.jwt = require("jsonwebtoken");
    this.secret = process.env.JWT_SECRET;
    this.appName = process.env.APP_NAME;
  }

  generateToken() {
    try {
      return this.jwt.sign(this.secret, {
        expiresIn: "1h",
      });
    } catch (error) {
      throw new Error("Failed to generate token");
    }
  }

  login(req, res) {
    try {
      const { username, authorization } = req.headers;

      if (
        username !== this.appName ||
        authorization.split(" ")[1] !== this.secret
      ) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = this.generateToken({});

      return res.json({
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
          message: "No token provided",
        });
      }

      const tokenString = token.split(" ")[1];

      this.jwt.verify(tokenString, this.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }

        next();
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = JwtService;
