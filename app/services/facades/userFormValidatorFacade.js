const emailValidator = require("../../services/emailValidator");
const nameValidator = require("../../services/nameValidator");

class userFormValidatorFacade {
  constructor() {
    this.nameValidator = new nameValidator();
    this.emailValidator = new emailValidator();
  }

  validateData(formData) {
    const { name, email } = formData;

    if (!this.emailValidator.validate(email)) {
      return { message: "Invalid email format" };
    }
    if (!this.nameValidator.validate(name)) {
      return { message: "Invalid name format" };
    }
    return true;
  }
}

module.exports = userFormValidatorFacade;
