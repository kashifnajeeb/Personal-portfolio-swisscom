//---------------
//  Dark Theme
//---------------
class DarkTheme {
  constructor() {
    this.elementsToStyle = document.querySelectorAll(
      ".section-skills-stats-percentage, .image-overlay-link, .btn, .image-overlay-description, .section-footer, .section-contact-input-label"
    );
    this.sectionFooter = document.querySelector(".section-footer");
    this.darkModeSlider = document.getElementById("section-header-darkmode");
    this.applyTheme();

    this.darkModeSlider.addEventListener(
      "input",
      this.handleDarkModeChange.bind(this)
    );

    const storedConfigurations =
      JSON.parse(localStorage.getItem("configurations")) || {};
    const initialDarkMode = storedConfigurations.darkMode;

    this.darkModeSlider.value = initialDarkMode ? "3" : "2";

    if (!storedConfigurations.hasOwnProperty("darkMode")) {
      storedConfigurations.darkMode = initialDarkMode;
      localStorage.setItem(
        "configurations",
        JSON.stringify(storedConfigurations)
      );
    }

    this.applyTheme();

    if (initialDarkMode === false) {
      this.darkModeSlider.value = "1";
    }
  }

  handleDarkModeChange() {
    const value = parseInt(this.darkModeSlider.value);
    const configurations =
      JSON.parse(localStorage.getItem("configurations")) || {};

    if (value === 1) {
      configurations.darkMode = false;
    } else if (value === 2) {
      delete configurations.darkMode;
    } else if (value === 3) {
      configurations.darkMode = true;
    }

    localStorage.setItem("configurations", JSON.stringify(configurations));
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
  const darkTheme = new DarkTheme();

  const range = document.querySelector(".section-header-theme-toggler");
  let styleElement = document.getElementById("custom-style");

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "custom-style";
    document.head.appendChild(styleElement);
  }

  // Because cannot select pseudo elements in JavaScript
  function updateBackgroundImage(value) {
    const images = {
      1: "../media/sunny-outline.svg",
      2: "../media/contrast.svg",
      3: "../media/moon-outline.svg",
    };

    const cssRule = `background-image: url('${images[value]}');`;
    const css = `.section-header-theme-toggler::-webkit-slider-thumb { ${cssRule} } .section-header-theme-toggler::-moz-range-thumb { ${cssRule} }`;

    styleElement.innerHTML = css;
  }

  range.addEventListener("input", function () {
    const value = range.value;
    updateBackgroundImage(value);
  });

  updateBackgroundImage(range.value);
});
