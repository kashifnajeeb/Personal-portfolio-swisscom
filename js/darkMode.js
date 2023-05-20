class DarkTheme {
  constructor() {
    this.elementsToStyle = document.querySelectorAll(
      ".section-skills-stats-percentage, .image-overlay-link, .btn, .image-overlay-description, .section-footer, .section-contact-input-label"
    );
    this.sectionFooter = document.querySelector(".section-footer");
    this.darkModeSlider = document.getElementById("section-header-darkmode");
    this.initialDarkMode =
      JSON.parse(localStorage.getItem("configurations"))?.darkMode || false;
    this.applyTheme();
  }

  applyTheme() {
    const darkModeValue = parseInt(this.darkModeSlider.value);

    if (
      darkModeValue === 1 ||
      (darkModeValue === 2 && !this.isDeviceInDarkMode())
    ) {
      this.clearStyles();
    } else {
      this.setCSSVariables();
      this.setStyleColors();
      this.setStyleFooter();
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

  // Apply or remove the dark theme based on the slider value
  function handleDarkModeChange() {
    const value = parseInt(darkModeSlider.value);

    if (value === 1) {
      localStorage.setItem(
        "configurations",
        JSON.stringify({ darkMode: false })
      );
    } else if (value === 2) {
      const storedConfigurations = JSON.parse(
        localStorage.getItem("configurations")
      );
      if (storedConfigurations && storedConfigurations.darkMode !== undefined) {
        delete storedConfigurations.darkMode;
        localStorage.setItem(
          "configurations",
          JSON.stringify(storedConfigurations)
        );
      }
    } else if (value === 3) {
      localStorage.setItem(
        "configurations",
        JSON.stringify({ darkMode: true })
      );
    }

    darkTheme.applyTheme();
  }

  // Add event listener to the slider for applying/removing the theme dynamically
  const darkModeSlider = document.getElementById("section-header-darkmode");
  darkModeSlider.addEventListener("input", handleDarkModeChange);

  // Get the stored value from localStorage
  const storedConfigurations = JSON.parse(
    localStorage.getItem("configurations")
  );
  const initialDarkMode = storedConfigurations?.darkMode;

  // Set the initial value of the slider based on the stored value or default to 2
  darkModeSlider.value = initialDarkMode ? "3" : "2";

  // Store the initial value in localStorage if it doesn't exist
  if (!storedConfigurations || storedConfigurations.darkMode === undefined) {
    localStorage.setItem(
      "configurations",
      JSON.stringify({ darkMode: initialDarkMode })
    );
  }

  // Apply the initial theme based on the stored value in localStorage or device's color scheme
  darkTheme.applyTheme();

  // Update the input range value to 1 if darkMode is false
  if (initialDarkMode === false) {
    darkModeSlider.value = "1";
  }
});
