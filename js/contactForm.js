class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(form.querySelectorAll("input, textarea"));
    this.submitButton = form.querySelector('input[type="submit"]');
    this.touchedInputs = new Set();

    this.formSubmissionMessage = document.createElement("p");
    this.formSubmissionMessage.classList.add("form-submission-message");
    form.appendChild(this.formSubmissionMessage);

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.inputs.forEach((input) => {
      input.addEventListener("blur", this.handleBlur.bind(this, input));
      input.addEventListener("input", this.handleInput.bind(this, input)); // Add input event listener
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

    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = errorMessages[input.name] || message;
      errorElement.style.opacity = 1; // Show the error message
    } else {
      const newErrorElement = document.createElement("p");
      newErrorElement.classList.add("error-message");
      newErrorElement.textContent = errorMessages[input.name] || message;
      newErrorElement.style.opacity = 1; // Show the error message
      input.parentNode.insertBefore(newErrorElement, input.nextElementSibling);
    }
  }

  hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
  }

  validateForm() {
    let formValid = true;

    this.inputs.forEach((input) => {
      const value = input.value.trim();
      const isValid = value !== "";

      if (this.touchedInputs.has(input)) {
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

    this.submitButton.disabled = !formValid;
    return formValid;
  }

  validateEmail(email) {
    // Regular expression for email validation
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

    this.displaySubmissionMessage("Sending message...", "submitting");

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
        this.displaySubmissionMessage("Message sent successfully!", "success");
        this.form.reset();
        this.touchedInputs.clear(); // Clear the touched inputs
        this.inputs.forEach((input) => this.hideError(input)); // Clear error messages
      } else if (responseData.errors) {
        const errorMessages = responseData.errors.map((error) => error.message);
        this.displaySubmissionMessage(errorMessages.join(", "), "error");
      } else {
        this.displaySubmissionMessage(
          "Oops! Something went wrong. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      this.displaySubmissionMessage(
        "Oops! Something went wrong. Please try again later.",
        "error"
      );
    }
  }

  displaySubmissionMessage(message, messageType) {
    this.formSubmissionMessage.textContent = message;
    this.formSubmissionMessage.classList.add(messageType); // Add the appropriate CSS class for styling
    this.formSubmissionMessage.style.opacity = 1; // Show the form submission message

    setTimeout(() => {
      this.formSubmissionMessage.style.opacity = 0; // Hide the form submission message
      this.formSubmissionMessage.classList.remove(messageType); // Remove the message type CSS class
    }, 3000);
  }
}

const form = document.querySelector(".section-contact-form");
new FormValidator(form);
