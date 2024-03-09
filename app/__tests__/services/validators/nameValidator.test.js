const NameValidator = require("../../../services/validators/nameValidator");

describe("EmailValidator", () => {
  describe("validate", () => {
    test.each([["Ricardo Silva"], ["Ricardo Silva Jr"], ["Ricardo Silva Jr"]])(
      "should return true when a valid name (%s) is provided",
      (name) => {
        const nameValidator = new NameValidator();
        const result = nameValidator.validate(name);
        expect(result).toBe(true);
      }
    );

    test.each([
      ["Ricardo"],
      ["Silva"],
      ["Ricardo Silva Jr."],
      ["Ricardo Silva  123"],
      ["ricardo silva jr"],
    ])("should return false when an invalid name (%s) is provided", (name) => {
      const nameValidator = new NameValidator();
      const result = nameValidator.validate(name);
      expect(result).toBe(false);
    });
  });
});
