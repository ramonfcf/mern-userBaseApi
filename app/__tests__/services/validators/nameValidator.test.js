const NameValidator = require("../../../services/validators/nameValidator");

describe("EmailValidator", () => {
  const nameResponses = {
    number: "Name must contain at least two words",
    format: "Name must contain only letters",
    capital: "Each word in the name must start with a capital letter",
  };

  describe("validate", () => {
    test.each([["Ricardo Silva"], ["Ricardo Silva Jr"], ["Ricardo Silva Jr"]])(
      "should return true when a valid name (%s) is provided",
      (name) => {
        const nameValidator = new NameValidator();
        const result = nameValidator.validate(name);
        expect(result.validation).toBe(true);
      }
    );

    test.each([
      ["Ricardo", nameResponses.number],
      ["Ricardo Silva 123", nameResponses.format],
      ["ricardo Silva Jr", nameResponses.capital],
    ])(
      "should return false when an invalid name (%s) is provided",
      (name, message) => {
        const nameValidator = new NameValidator();
        const result = nameValidator.validate(name);
        expect(result.message).toContain(message);
        expect(result.validation).toBe(false);
      }
    );
  });
});
