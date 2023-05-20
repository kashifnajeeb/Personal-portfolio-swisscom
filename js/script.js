//---------------
//  General JS if needed
//---------------

// Showing current Year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Change image of theme slider
document.addEventListener("DOMContentLoaded", function () {
  const range = document.querySelector(".section-header-theme-toggler");
  let styleElement = document.getElementById("custom-style");

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "custom-style";
    document.head.appendChild(styleElement);
  }

  function updateBackgroundImage(value) {
    let cssRule = "";

    if (value === "1") {
      cssRule = `background-image: url('../media/sunny-outline.svg');`;
    } else if (value === "2") {
      cssRule = `background-image: url('../media/contrast.svg');`;
    } else if (value === "3") {
      cssRule = `background-image: url('../media/moon-outline.svg');`;
    }

    // Update the stylesheet with the new CSS rule
    styleElement.innerHTML = `.section-header-theme-toggler::-webkit-slider-thumb { ${cssRule} }`;
    console.log(getComputedStyle(range).getPropertyValue("background-image"));
  }

  range.addEventListener("input", function () {
    const value = range.value;
    updateBackgroundImage(value);
  });

  updateBackgroundImage(range.value);
});
