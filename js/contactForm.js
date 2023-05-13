class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(form.querySelectorAll("input, textarea"));
    this.submitButton = form.querySelector('input[type="submit"]');
    this.touchedInputs = new Set();
    this.emailInput = this.inputs.find((input) => input.name === "email"); // Initialize emailInput as a class property
    this.emailValidationTimeout = null; // Variable to store the email validation timeout

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.inputs.forEach((input) => {
      input.addEventListener("blur", this.handleBlur.bind(this, input));
      input.addEventListener("input", this.handleInput.bind(this, input));
      input.addEventListener("focus", this.handleFocus.bind(this, input));
    });

    this.validateForm(); // Disable submit button on first load
  }

  showError(input, message) {
    const errorMessages = {
      name: "Please enter your name:",
      subject: "Please enter a subject:",
      email: "Please enter a valid email address:",
      message: "Please enter a message:",
    };

    const labelElement = input.parentNode.querySelector("label");
    const originalLabel =
      labelElement.dataset.originalLabel || labelElement.textContent;
    labelElement.textContent = errorMessages[input.name] || message;
    labelElement.classList.add("error-message");
    labelElement.dataset.originalLabel = originalLabel;
  }

  hideError(input) {
    const labelElement = input.parentNode.querySelector("label");
    const originalLabel =
      labelElement.dataset.originalLabel || labelElement.textContent;
    labelElement.textContent = originalLabel;
    labelElement.classList.remove("error-message");
  }

  validateForm() {
    let formValid = true;
    let hasTouchedInput = false;
    let hasUntouchedRequiredInput = false; // Track if there are any untouched required inputs

    this.inputs.forEach((input) => {
      const value = input.value.trim();
      const isValid = value !== "";

      if (this.touchedInputs.has(input)) {
        hasTouchedInput = true;

        if (!isValid) {
          formValid = false;
          this.showError(input, "This field is required.");
        } else {
          this.hideError(input);
        }
      } else if (input.required) {
        // Check if the input is required
        hasUntouchedRequiredInput = true;
      }
    });

    formValid = formValid && hasTouchedInput && this.validateEmail(); // Check if email is valid
    this.submitButton.disabled = !formValid;
    // Disable submit button if form is not valid or there are untouched required inputs
    if (!formValid || hasUntouchedRequiredInput) {
      this.submitButton.disabled = true;
    } else {
      // Enable submit button
      this.submitButton.disabled = false;
    }

    return formValid;
  }

  validateEmail() {
    const emailValue = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      this.touchedInputs.has(this.emailInput) &&
      emailValue !== "" &&
      !emailRegex.test(emailValue)
    ) {
      this.showError(this.emailInput, "Please enter a valid email address:");
      return false;
    }

    this.hideError(this.emailInput);
    return true;
  }

  handleBlur(input) {
    this.touchedInputs.add(input);
    this.validateForm();
  }

  handleInput(input) {
    this.touchedInputs.add(input); // Mark the input as touched
    if (input.name === "email") {
      clearTimeout(this.emailValidationTimeout); // Clear the previous timeout, if any
      this.emailValidationTimeout = setTimeout(() => {
        this.validateEmail(); // Validate email after 3 seconds
        this.validateForm(); // Validate the entire form
      }, 1000);
    } else {
      const value = input.value.trim();
      const isValid = value !== "";

      if (!isValid) {
        this.showError(input, "This field is required.");
      } else {
        this.hideError(input);
      }

      this.validateForm();
    }
  }

  handleFocus(input) {
    this.touchedInputs.delete(input);
    // Revalidate email input if it is being focused
    if (input === this.emailInput) {
      this.validateEmail();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

    this.submitButton.disabled = true;
    this.submitButton.value = "Sending...";

    try {
      const response = await fetch(event.target.action, {
        method: this.form.method,
        body: new FormData(event.target),
        headers: {
          Accept: "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        this.form.reset();
        this.touchedInputs.clear();
        this.inputs.forEach((input) => this.hideError(input));
        this.submitButton.value = "Message Sent";
      } else if (responseData.errors) {
        const errorMessage = responseData.errors
          .map((error) => error.message)
          .join(", ");
        this.submitButton.value = errorMessage;
      } else {
        this.submitButton.value =
          "Oops! Something went wrong. Please try again.";
      }
      setTimeout(() => {
        this.submitButton.value = "Send";
      }, 3000); // Revert back to "Send" after 3 seconds
    } catch (error) {
      this.submitButton.value = "Oops! Something went wrong. Please try again.";
    }
  }
}

const form = document.querySelector(".section-contact-form");
new FormValidator(form);
