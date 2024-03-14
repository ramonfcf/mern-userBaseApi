class EmailValidator {
  validate(email) {

    if (email === undefined || email === null || email === "") {
      return { validation: true };
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return {
      validation: emailRegex.test(email),
      message:
        "Invalid email format. The email must contain an '@' and a 'domain.'",
    };
  }
}

module.exports = EmailValidator;
