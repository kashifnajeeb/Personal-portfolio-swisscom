// Get Scroll Position
let lastScrollPosition = window.pageYOffset;

// Selectors
const header = document.querySelector(".section-header");
const mobileNavbarCheckbox = document.getElementById("section-header-check");
const headerLinks = document.querySelectorAll(".section-header-navbar-link");

// Scroll event listener
window.addEventListener("scroll", function () {
  if (mobileNavbarCheckbox.checked) {
    // Mobile navbar is open, do not apply scrolling logic
    return;
  }

  const currentScrollPosition = window.pageYOffset;

  // Showing header only when scrolling up
  header.style.top =
    currentScrollPosition < lastScrollPosition ? "0" : "-10rem";

  lastScrollPosition = currentScrollPosition;

  // Add shadow when scrolling down
  header.style.boxShadow = currentScrollPosition > 0 ? "var(--shadow)" : "none";
});

// Click event listener for header links
headerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Uncheck the responsive header checkbox
    mobileNavbarCheckbox.checked = false;
  });
});
