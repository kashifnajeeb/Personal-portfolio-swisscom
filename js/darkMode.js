class DarkTheme {
  constructor() {
    this.elementsToStyle = document.querySelectorAll(
      ".section-skills-stats-percentage, .image-overlay-link, .btn, .image-overlay-description, .section-footer"
    );
    this.sectionFooter = document.querySelector(".section-footer");
  }

  applyTheme() {
    this.setCSSVariables();
    this.setStyleColors();
    this.setStyleFooter();
    this.setStyleScrollToTop();
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

  setStyleScrollToTop() {
    document.addEventListener("DOMContentLoaded", () => {
      scrollToTop.scrollElement.style.color = "var(--black)";
    });
  }
}

// Create an instance of DarkTheme
const darkTheme = new DarkTheme();

// Apply the dark theme
darkTheme.applyTheme();
