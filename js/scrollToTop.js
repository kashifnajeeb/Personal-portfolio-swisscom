//---------------
//  Scroll To Top
//---------------
class ScrollToTop {
  constructor() {
    this.footerElem = document.querySelector(".section-footer");
    this.scrollElement = document.createElement("div");
    this.scrollElement.classList.add("scroll-to-top");
    this.scrollElement.innerHTML = `<ion-icon name="arrow-up-outline" class="scroll-to-top-icon"></ion-icon>`;
    this.footerElem.after(this.scrollElement);
    this.scrollElement.addEventListener("click", this.scrollTop.bind(this));
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const scrollToTop = new ScrollToTop();
