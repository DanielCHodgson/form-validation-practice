export default class FormValidator {
  static validateEmail(input) {
    const errorContainer = input.nextElementSibling;

    if (input.validity.valid) {
      this.#clearError(errorContainer);
      return true;
    } else {
      if (input.validity.valueMissing) {
        this.#showError(errorContainer, "Email is required.");
      } else if (input.validity.typeMismatch) {
        this.#showError(errorContainer, "Please enter a valid email.");
      }
      return false;
    }
  }

  static validatePassword(input) {
    const errorContainer = input.nextElementSibling;
  
    if (input.validity.valid && input.value.length >= 8) {
      this.#clearError(errorContainer);
      return true;
    } else {
      this.#showError(
        errorContainer,
        "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one number."
      );
      return false;
    }
  }
  

  static validateConfirmPassword(input, isMatch) {
    const errorContainer = input.nextElementSibling;
    if (isMatch) {
      this.#clearError(errorContainer);
      return true;
    } else {
      this.#showError(errorContainer, "Passwords do not match.");
      return false;
    }
  }

  static validateCountry(input) {
    const errorContainer = input.nextElementSibling;
    if (input.validity.valid && input.value !== "") {
      this.#clearError(errorContainer);
      return true;
    } else {
      this.#showError(errorContainer, "Please select a valid country.");
      return false;
    }
  }

  static validatePostcode(input, country) {
    const errorContainer = input.nextElementSibling;
    let pattern;

    switch (country.toLowerCase()) {
      case "us":
        pattern = /^\d{5}(-\d{4})?$/;
        break;
      case "ca":
        pattern = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
        break;
      case "uk":
        pattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/;
        break;
      case "au":
        pattern = /^\d{4}$/;
        break;
      default:
        pattern = /^$/;
    }

    if (pattern.test(input.value)) {
      this.#clearError(errorContainer);
      return true;
    } else {
      this.#showError(errorContainer, `Enter a valid postcode for ${country}.`);
      return false;
    }
  }

  static #clearError(container) {
    if (container) {
      container.textContent = "";
      container.classList.remove("error-active");
    }
  }

  static #showError(container, message) {
    if (container) {
      container.textContent = message;
      container.classList.add("error-active");
    }
  }
}
