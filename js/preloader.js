//---------------
//  Preloader
//---------------
class Preloader {
  constructor(elementId) {
    this.preloader = document.getElementById(elementId);
    this.loadingScreen = this.loadingScreen.bind(this);
    window.addEventListener("load", this.loadingScreen);
  }

  loadingScreen() {
    this.preloader.style.display = "none";
  }
}

const preloader = new Preloader("preloader");
