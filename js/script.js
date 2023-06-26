//---------------
//  General JS if needed
//---------------

// Showing current Year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Typewriter Effect in Hero Section Logo
const typewriter = new Typewriter(".section-hero-logo", {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(2500)
  .typeString("KN")
  .pauseFor(500)
  .deleteChars(1)
  .typeString("ashif Najeeb")
  .pauseFor(500)
  .start();
