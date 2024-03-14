class NameValidator {
  validate(name) {
    if (name === undefined || name === null || name === "") {
      return { validation: true };
    }

    let result;

    result = this.#validNumberOfWords(name);
    if (!result.validation) {
      return result;
    }

    result = this.#validateNameFormat(name);
    if (!result.validation) {
      return result;
    }

    result = this.#validateEveryWord(name);
    if (!result.validation) {
      return result;
    }

    return { validation: true };
  }

  #validNumberOfWords(name) {
    const validation = name.split(" ").length > 1;
    return {
      validation,
      message: validation ? "" : "Name must contain at least two words",
    };
  }

  #validateNameFormat(name) {
    const validation = /^[a-zA-Z\s]*$/.test(name);
    return {
      validation,
      message: validation ? "" : "Name must contain only letters",
    };
  }

  #validateEveryWord(name) {
    const validation = name.split(" ").every((word) => /^[A-Z]/.test(word));
    return {
      validation,
      message: validation
        ? ""
        : "Each word in the name must start with a capital letter",
    };
  }
}

module.exports = NameValidator;