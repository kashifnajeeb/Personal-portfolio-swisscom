class Header {
  constructor() {
    // Selectors
    this.header = document.querySelector(".section-header");
    this.mobileNavbarCheckbox = document.getElementById("section-header-check");
    this.headerLinks = document.querySelectorAll(".section-header-navbar-link");
    // Checking header at Top
    this.lastScrollPosition = 0;
    this.isHeaderAtTop = true;
  }

  init() {
    this.adjustHeaderStyle(this.lastScrollPosition);
    this.addListeners();
  }

  addListeners() {
    // Scroll event listener
    window.addEventListener("scroll", () => {
      if (this.mobileNavbarCheckbox.checked) {
        // Mobile navbar is open, do not apply scrolling logic
        return;
      }

      const currentScrollPosition = window.pageYOffset;
      const isScrollingUp = currentScrollPosition < this.lastScrollPosition;

      // Show or hide the header based on scroll direction
      this.showHideHeader(isScrollingUp);

      // Adjust the header style based on scroll position
      this.adjustHeaderStyle(currentScrollPosition);

      this.lastScrollPosition = currentScrollPosition;
    });

    // Click event listener for header links
    this.headerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Uncheck the responsive header checkbox
        this.mobileNavbarCheckbox.checked = false;
      });
    });
  }

  showHideHeader(isScrollingUp) {
    this.header.style.top = isScrollingUp ? "0" : "-10rem";
  }

  adjustHeaderStyle(currentScrollPosition) {
    if (currentScrollPosition > 5) {
      // Header is not at the top and scrolling is more than 5 pixels
      this.setHeaderStyle(
        "8rem",
        "var(--shadow)",
        "saturate(180%) blur(20px)",
        "rgba(237, 236, 255, 0.3)"
      );
      this.isHeaderAtTop = false;
    } else {
      // Header is at the top or scrolling is less than or equal to 5 pixels
      if (!this.isHeaderAtTop) {
        // Header was not at the top, reset styling
        this.setHeaderStyle("10rem", "none", "none", "var(--bg)");
        this.isHeaderAtTop = true;
      }
    }
  }

  setHeaderStyle(height, boxShadow, backdropFilter, backgroundColor) {
    this.header.style.height = height;
    this.header.style.boxShadow = boxShadow;
    this.header.style.backdropFilter = backdropFilter;
    this.header.style.webkitBackdropFilter = backdropFilter;
    this.header.style.backgroundColor = backgroundColor;
  }
}

// Initialize the header functionality
const header = new Header();
header.init();
