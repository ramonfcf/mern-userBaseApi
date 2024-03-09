const JwtService = require("../../services/jwtService");

describe("JwtService", () => {
  let jwtService;

  beforeAll(() => {
    process.env.JWT_SECRET = "your_jwt_secret";
    process.env.APP_NAME = "your_app_name";
    jwtService = new JwtService();
  });

  describe("generateToken", () => {
    it("should return a token when valid credentials are provided", () => {
      const token = jwtService.generateToken();
      expect(token).toEqual(expect.any(String));
    });

    it("should throw an error if failed to generate token", () => {
      jest.spyOn(jwtService.jwt, "sign").mockImplementation(() => {
        throw new Error("Failed to generate token");
      });

      expect(() => jwtService.generateToken()).toThrow(
        "Failed to generate token"
      );

      jest.restoreAllMocks();
    });
  });

  describe("login", () => {
    it("should return a token when valid credentials are provided", () => {
      const req = {
        headers: {
          username: process.env.APP_NAME,
          authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jwtService.login(req, res);

      expect(res.status).not.toHaveBeenCalledWith(401);
      expect(res.status).not.toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it("should return 401 if invalid credentials are provided", () => {
      const req = {
        headers: {
          username: "invalid_username",
          authorization: "Bearer invalid_secret",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jwtService.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Invalid credentials" })
      );
    });

    it("should return 500 if an error occurs during login", () => {
      jest.spyOn(jwtService, "generateToken").mockImplementation(() => {
        throw new Error("Failed to generate token");
      });

      const req = {
        headers: {
          username: process.env.APP_NAME,
          authorization: `Bearer ${process.env.JWT_SECRET}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jwtService.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Internal server error" })
      );

      jest.restoreAllMocks();
    });
  });

  describe("verifyToken", () => {
    it("should receive 200 if a valid token is provided", () => {
      const req = {
        headers: {
          username: process.env.APP_NAME,
          authorization: `Bearer ${jwtService.generateToken({})}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwtService.verifyToken(req, res, next);

      expect(res.status).not.toHaveBeenCalledWith(401);
      expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it("should return 401 if no token is provided", () => {
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwtService.verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "No token provided" })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 if an invalid token is provided", () => {
      const req = {
        headers: {
          authorization: "Bearer invalid_token",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwtService.verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Invalid token" })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurs during verifyToken", () => {
      jest.spyOn(jwtService.jwt, "verify").mockImplementation(() => {
        throw new Error("Failed to verify token");
      });

      const req = {
        headers: {
          username: process.env.APP_NAME,
          authorization: `Bearer ${jwtService.generateToken({})}`,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwtService.verifyToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Internal server error" })
      );
      expect(next).not.toHaveBeenCalled();

      jest.restoreAllMocks();
    });
  });
});
