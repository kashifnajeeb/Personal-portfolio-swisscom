class Header {
  constructor() {
    // Header properties
    this.header = document.querySelector(".section-header");
    this.mobileNavbarCheckbox = document.getElementById("section-header-check");
    this.headerLinks = document.querySelectorAll(".section-header-navbar-link");
    this.lastScrollPosition = 0;
    this.isHeaderAtTop = true;

    // Navbar properties
    this.navbarLinks = document.querySelectorAll(".section-header-navbar-link");
    this.scrollPosition = 0;
    this.maxVisibleArea = 0;
    this.activeLink = null;
  }

  init() {
    this.initHeader();
    this.initNavbar();
  }

  initHeader() {
    this.adjustHeaderStyle(this.lastScrollPosition);
    this.addHeaderEventListeners();
  }

  addHeaderEventListeners() {
    window.addEventListener("scroll", () => {
      if (this.mobileNavbarCheckbox.checked) {
        return;
      }

      const currentScrollPosition = window.pageYOffset;
      const isScrollingUp = currentScrollPosition < this.lastScrollPosition;

      this.showHideHeader(isScrollingUp);
      this.adjustHeaderStyle(currentScrollPosition);

      this.lastScrollPosition = currentScrollPosition;
    });

    this.headerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.mobileNavbarCheckbox.checked = false;
      });
    });
  }

  showHideHeader(isScrollingUp) {
    this.header.style.top = isScrollingUp ? "0" : "-10rem";
  }

  adjustHeaderStyle(currentScrollPosition) {
    if (currentScrollPosition > 0) {
      this.setHeaderStyle(
        "8rem",
        "var(--shadow)",
        "saturate(180%) blur(20px)",
        "var(--backdropColor)"
      );
      this.isHeaderAtTop = false;
    } else {
      if (!this.isHeaderAtTop) {
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

  initNavbar() {
    this.addNavbarEventListeners();
    this.setActiveLink();
  }

  addNavbarEventListeners() {
    window.addEventListener("scroll", () => this.setActiveLink());
    window.addEventListener("DOMContentLoaded", () => this.setActiveLink());
  }

  setActiveLink() {
    this.scrollPosition = window.scrollY;
    this.maxVisibleArea = 0;
    this.activeLink = null;

    this.navbarLinks.forEach((link) => {
      const targetSectionId = link.getAttribute("href").substring(2);
      const targetSection = document.getElementById(targetSectionId);

      if (
        this.isInViewport(targetSection) ||
        (targetSection.offsetTop <= this.scrollPosition &&
          targetSection.offsetTop + targetSection.offsetHeight >
            this.scrollPosition)
      ) {
        const visibleArea = this.calculateVisibleArea(targetSection);

        if (visibleArea > this.maxVisibleArea) {
          this.maxVisibleArea = visibleArea;
          this.activeLink = link;
        }
      }
    });

    this.navbarLinks.forEach((link) => {
      if (link === this.activeLink) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  calculateVisibleArea(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const height =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    return height * rect.width;
  }
}

// Initialize the header and navbar functionality
const header = new Header();
header.init();
