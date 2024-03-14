const emailValidator = require("../validators/emailValidator");
const nameValidator = require("../validators/nameValidator");

class userFormValidatorFacade {
  constructor() {
    this.nameValidator = new nameValidator();
    this.emailValidator = new emailValidator();
  }

  validateData(formData) {
    const { name, email } = formData;

    const nameValidation = this.nameValidator.validate(name);
    const emailValidation = this.emailValidator.validate(email);

    if (nameValidation.validation === false) return nameValidation;

    if (emailValidation.validation === false) return emailValidation;

    return { validation: true };
  }
}

module.exports = userFormValidatorFacade;
