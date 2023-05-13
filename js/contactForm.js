class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(form.querySelectorAll("input, textarea"));
    this.submitButton = form.querySelector('input[type="submit"]');
    this.touchedInputs = new Set();

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.inputs.forEach((input) => {
      input.addEventListener("blur", this.handleBlur.bind(this, input));
      input.addEventListener("input", this.handleInput.bind(this, input));
      input.addEventListener("focus", this.handleFocus.bind(this, input));
    });

    this.validateForm();
  }

  showError(input, message) {
    const errorMessages = {
      name: "Please enter your name.",
      subject: "Please enter a subject.",
      email: "Please enter a valid email address.",
      message: "Please enter a message.",
    };

    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = errorMessages[input.name] || message;
    } else {
      errorElement = document.createElement("p");
      errorElement.classList.add("error-message");
      errorElement.textContent = errorMessages[input.name] || message;
      input.parentNode.insertBefore(errorElement, input.nextElementSibling);
    }
    errorElement.style.opacity = 1;
  }

  hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
  }

  validateForm() {
    let formValid = true;
    let hasTouchedInput = false;

    this.inputs.forEach((input) => {
      const value = input.value.trim();
      const isValid = value !== "";

      if (this.touchedInputs.has(input)) {
        hasTouchedInput = true;

        if (input.type === "email" && !this.validateEmail(value)) {
          formValid = false;
          this.showError(input, "Please enter a valid email address.");
        } else if (!isValid) {
          formValid = false;
          this.showError(input, "This field is required.");
        } else {
          this.hideError(input);
        }
      }
    });

    if (!hasTouchedInput) {
      formValid = false;
    }

    this.submitButton.disabled = !formValid;
    return formValid;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleBlur(input) {
    this.touchedInputs.add(input);
    this.validateForm();
  }

  handleInput(input) {
    this.validateForm();
  }

  handleFocus(input) {
    this.touchedInputs.delete(input);
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
        responseData.errors.forEach((error) => {
          this.displayErrorMessage(error.message);
        });
        this.submitButton.value = "Send";
      } else {
        this.displayErrorMessage(
          "Oops! Something went wrong. Please try again later."
        );
        this.submitButton.value = "Send";
      }
    } catch (error) {
      this.displayErrorMessage(
        "Oops! Something went wrong. Please try again later."
      );
      this.submitButton.value = "Send";
    }

    setTimeout(() => {
      this.submitButton.value = "Send";
    }, 3000);
  }

  displayErrorMessage(message) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("form-error-message");
    errorElement.textContent = message;
    this.form.insertBefore(errorElement, this.submitButton);
  }
}

const form = document.querySelector(".section-contact-form");
new FormValidator(form);
