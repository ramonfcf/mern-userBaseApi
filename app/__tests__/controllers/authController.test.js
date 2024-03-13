const { login, authenticate } = require("../../controllers/authController");

const mockJwtServiceLogin = jest.fn();

jest.mock("../../services/jwtService", () => {
  return jest.fn().mockImplementation(() => {
    return {
      authenticate: () => {
        return { login: mockJwtServiceLogin };
      },
    };
  });
});

describe("authController", () => {
  describe("login", () => {
    const req = { body: { username: "your_app", password: "123456" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    it("should call jwtService.login", () => {
      authenticate(req, res);
      expect(mockJwtServiceLogin).toHaveBeenCalled();
    });
  });
});
