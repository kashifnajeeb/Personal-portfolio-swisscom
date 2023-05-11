//---------------
//  Header
//---------------
class Header {
  constructor() {
    // Selectors
    this.header = document.querySelector(".section-header");
    this.mobileNavbarCheckbox = document.getElementById("section-header-check");
    this.headerLinks = document.querySelectorAll(".section-header-navbar-link");
    // Tracking header position
    this.lastScrollPosition = 0;
    this.isHeaderAtTop = true;
  }

  init() {
    // Initial adjustment of header style
    this.adjustHeaderStyle(this.lastScrollPosition);
    // Add event listeners
    this.addListeners();
  }

  addListeners() {
    // Scroll event listener
    window.addEventListener("scroll", () => {
      // Check if mobile navbar is open
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

      // Update the last scroll position
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
    // Show or hide the header based on scroll direction
    this.header.style.top = isScrollingUp ? "0" : "-10rem";
  }

  adjustHeaderStyle(currentScrollPosition) {
    if (currentScrollPosition > 0) {
      // Header is not at the top and scrolling is more than 5 pixels
      this.setHeaderStyle(
        "8rem",
        "var(--shadow)",
        "saturate(180%) blur(20px)",
        "var(--backdropColor)"
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
    // Set the header style properties
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
