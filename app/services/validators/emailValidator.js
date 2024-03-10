class EmailValidator {
  validate(email) {

    if (email === undefined) {
      return true;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return emailRegex.test(email);
  }
}

module.exports = EmailValidator;
