//---------------
//  Dark Theme
//---------------
class DarkTheme {
  constructor() {
    this.elementsToStyle = document.querySelectorAll(
      ".section-skills-stats-percentage, .image-overlay-link, .btn, .image-overlay-description, .section-footer, .section-contact-input-label"
    );
    this.sectionFooter = document.querySelector(".section-footer");
    this.darkModeCheckbox = document.getElementById("section-header-darkmode");
    this.initialDarkMode =
      JSON.parse(localStorage.getItem("configurations"))?.darkMode || false;
    this.applyTheme();
  }

  applyTheme() {
    if (
      this.darkModeCheckbox.checked &&
      (this.isDeviceInDarkMode() || this.initialDarkMode)
    ) {
      this.setCSSVariables();
      this.setStyleColors();
      this.setStyleFooter();
    } else {
      this.clearStyles();
    }
  }

  isDeviceInDarkMode() {
    const configurations =
      JSON.parse(localStorage.getItem("configurations")) || {};
    if (configurations.hasOwnProperty("darkMode")) {
      return configurations.darkMode;
    } else {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }

  setCSSVariables() {
    const root = document.documentElement.style;
    root.setProperty("--heading", "#fff");
    root.setProperty("--para", "#948fbf");
    root.setProperty("--white", "#1a1a1a");
    root.setProperty("--black", "#fff");
    root.setProperty("--helper-tint", "#1a1a1a");
    root.setProperty("--bg", "#000");
  }

  setStyleColors() {
    this.elementsToStyle.forEach((element) => {
      element.style.color = "var(--black)";
    });
  }

  setStyleFooter() {
    this.sectionFooter.style.color = "var(--black)";
    this.sectionFooter.style.backgroundColor = "var(--white)";
  }

  clearStyles() {
    const root = document.documentElement.style;
    root.removeProperty("--heading");
    root.removeProperty("--para");
    root.removeProperty("--white");
    root.removeProperty("--black");
    root.removeProperty("--helper-tint");
    root.removeProperty("--bg");

    this.elementsToStyle.forEach((element) => {
      element.style.color = "";
    });

    this.sectionFooter.style.color = "";
    this.sectionFooter.style.backgroundColor = "";

    const scrollToTopElement = document.getElementById("scrollToTop");
    if (scrollToTopElement) {
      scrollToTopElement.style.color = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Create an instance of DarkTheme
  const darkTheme = new DarkTheme();

  // Apply or remove the dark theme based on the checkbox state
  function handleDarkModeToggle() {
    const isChecked = darkModeCheckbox.checked;
    let configurations = JSON.parse(localStorage.getItem("configurations"));

    if (!configurations) {
      configurations = {};
    }

    configurations.darkMode = isChecked;
    localStorage.setItem("configurations", JSON.stringify(configurations));
    darkTheme.applyTheme();
  }

  // Add event listener to the checkbox for applying/removing the theme dynamically
  const darkModeCheckbox = document.getElementById("section-header-darkmode");
  darkModeCheckbox.addEventListener("change", handleDarkModeToggle);

  // Apply the initial theme based on the stored value in localStorage or device's dark mode
  darkModeCheckbox.checked =
    darkTheme.initialDarkMode || darkTheme.isDeviceInDarkMode();
  darkTheme.applyTheme();
});
