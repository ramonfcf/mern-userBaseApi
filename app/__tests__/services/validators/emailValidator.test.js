const EmailValidator = require("../../../services/validators/emailValidator");

describe("EmailValidator", () => {
  describe("validate", () => {
    test.each([
      ["test@test.com"],
      ["test@123123.com"],
      ["123_test@test-212.com"],
    ])("should return true when a valid email (%s) is provided", (email) => {
      const emailValidator = new EmailValidator();
      const result = emailValidator.validate(email);
      expect(result).toBe(true);
    });

    test.each([
      ["test@test"],
      ["test@123123"],
      ["123_test@test-212"],
      ["test.com"],
      ["test"],
      ["test@.com"],
      ["test@com"],
    ])(
      "should return false when an invalid email (%s) is provided",
      (email) => {
        const emailValidator = new EmailValidator();
        const result = emailValidator.validate(email);
        expect(result).toBe(false);
      }
    );
  });
});
