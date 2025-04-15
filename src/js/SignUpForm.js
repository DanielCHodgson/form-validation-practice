import FormValidator from "./FormValidator.js";

export default class SignUpForm {
  #element;
  #fields;
  #submit;

  constructor(element) {
    this.#element = element;
    this.#fields = this.#cacheFields();
    this.#submit = this.#element.querySelector("#submit");
    this.#bindEvents();
  }

  #cacheFields() {
    return {
      email: this.#element.querySelector("#email"),
      password: this.#element.querySelector("#password"),
      confirmPassword: this.#element.querySelector("#confirmPassword"),
      country: this.#element.querySelector("#country"),
      postcode: this.#element.querySelector("#postcode"),
    };
  }

  #bindEvents() {
    this.#fields.email.addEventListener("input", () => {
      FormValidator.validateEmail(this.#fields.email);
    });

    this.#fields.password.addEventListener("input", () => {
      FormValidator.validatePassword(this.#fields.password);
    });

    this.#fields.confirmPassword.addEventListener("input", () => {
      const isMatch =
        this.#fields.confirmPassword.value === this.#fields.password.value;
      FormValidator.validateConfirmPassword(
        this.#fields.confirmPassword,
        isMatch
      );
    });

    this.#fields.country.addEventListener("input", () => {
      FormValidator.validateCountry(this.#fields.country);
    });

    this.#fields.postcode.addEventListener("input", () => {
      FormValidator.validatePostcode(
        this.#fields.postcode,
        this.#fields.country.value
      );
    });

    this.#element.addEventListener("submit", (event) =>
      this.#handleSubmit(event)
    );
  }

  #handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting form...");

    const allValid =
      FormValidator.validateEmail(this.#fields.email) &&
      FormValidator.validatePassword(this.#fields.password) &&
      FormValidator.validateConfirmPassword(
        this.#fields.confirmPassword,
        this.#fields.confirmPassword.value === this.#fields.password.value
      ) &&
      FormValidator.validateCountry(this.#fields.country) &&
      FormValidator.validatePostcode(
        this.#fields.postcode,
        this.#fields.country.value
      );

    if (allValid) {
      console.log("Hive five!");
    } else {
      console.log("Invalid fields!");
    }
  }
}
