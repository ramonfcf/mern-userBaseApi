const mockUserFormValidator = {
  validateData: jest.fn().mockReturnValue(true),
};

jest.mock("../../services/facades/userFormValidatorFacade.js", () => {
  return jest.fn().mockImplementation(() => {
    return mockUserFormValidator;
  });
});

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");
const userModel = require("../../models/userModel");

describe("userController", () => {
  const req = {
    body: {
      name: "John Doe",
      email: "test@test.com",
      birthdate: "1990-01-01",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  describe("createUser", () => {
    it("should call userFormValidator.validateData and send a response", async () => {
      const createMock = jest.fn().mockImplementationOnce(() => {
        return {
          _id: "mockedId",
          name: "John Doe",
          email: "test@test.com",
          birthdate: "1990-01-01",
        };
      });
      userModel.create = createMock;

      mockUserFormValidator.validateData.mockReturnValue(true);

      console.log("req.body:", req.body);

      await createUser(req, res);

      expect(mockUserFormValidator.validateData).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return a 400 status when userFormValidator.validateData returns false", async () => {
      mockUserFormValidator.validateData.mockReturnValue({
        message: "Invalid email format",
      });

      await createUser(req, res);

      expect(mockUserFormValidator.validateData).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email format",
      });
    });
  });

  describe("getUser", () => {
    it("should call userModel.findById and send a response", async () => {
      const mockedUser = { _id: "mockedId", name: "John Doe" };
      userModel.findById = jest.fn().mockResolvedValue(mockedUser);

      req.params = { id: "mockedId" };

      await getUser(req, res);

      expect(userModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(mockedUser);

      userModel.findById.mockClear();
    });
  });

  describe("updateUser", () => {
    it("should call userFormValidator.validateData and userModel.findByIdAndUpdate", async () => {
      const mockedUser = { _id: "mockedId", name: "John Doe" };
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockedUser);
      mockUserFormValidator.validateData.mockReturnValue(true);

      req.params = { id: "mockedId" };

      await updateUser(req, res);

      expect(mockUserFormValidator.validateData).toHaveBeenCalledWith(req.body);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        req.body,
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(mockedUser);
    });

    it("should return a 400 status when userFormValidator.validateData returns false", async () => {
      mockUserFormValidator.validateData.mockReturnValue({
        message: "Invalid email format",
      });

      await updateUser(req, res);

      expect(mockUserFormValidator.validateData).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email format",
      });
    });
  });

  describe("deleteUser", () => {
    it("should call userModel.findByIdAndDelete and send a response", async () => {
      const mockedUser = { _id: "mockedId", name: "John Doe" };
      userModel.findByIdAndDelete = jest.fn().mockResolvedValue(mockedUser);

      req.params = { id: "mockedId" };

      await deleteUser(req, res);

      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(mockedUser);
    });
  });
});
