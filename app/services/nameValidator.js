class NameValidator {
  validate(name) {
    return (
      this.#validNumberOfWords(name) &&
      this.#validateNameFormat(name) &&
      this.#validateEveryWord(name)
    );
  }

  #validNumberOfWords(name) {
    return name.split(" ").length > 1;
  }

  #validateNameFormat(name) {
    return /^[a-zA-Z\s]*$/.test(name);
  }

  #validateEveryWord(name) {
    return name.split(" ").every((word) => /^[A-Z]/.test(word));
  }
}

module.exports = NameValidator;
