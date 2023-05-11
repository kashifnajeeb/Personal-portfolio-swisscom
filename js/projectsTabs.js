class ProjectsTabs {
  constructor() {
    // Selectors
    this.sectionProjectBtns = document.querySelector(".section-projects-btns");
    this.sectionProjectsBtn = document.querySelectorAll(
      ".section-projects-btn"
    );
    this.sectionProjectsImages = document.querySelectorAll(".image-overlay");
    this.sectionProjectsAll = document.querySelector(".section-projects-all");

    this.addEventListeners();
  }
  addEventListeners() {
    this.sectionProjectsBtn.forEach((currElem) => {
      currElem.addEventListener("click", this.handleButtonClick.bind(this));
    });

    this.sectionProjectsAll.addEventListener(
      "click",
      this.handleAllClick.bind(this)
    );
  }

  // Clicking buttons and showing specific category
  handleButtonClick(e) {
    const p_btn_clicked = e.target;

    this.sectionProjectsBtn.forEach((currElem) => {
      currElem.classList.remove("section-projects-btn-active");
    });

    p_btn_clicked.classList.add("section-projects-btn-active");

    const btn_name = p_btn_clicked.dataset.sectionProjectsNum;
    const img_active = document.querySelectorAll(
      `.section-projects-btn--${btn_name}`
    );

    this.sectionProjectsImages.forEach((currElem) => {
      currElem.classList.add("section-projects-image-not-active");
    });

    img_active.forEach((currElem) => {
      currElem.classList.remove("section-projects-image-not-active");
    });
  }

  // Showing all projects
  handleAllClick() {
    this.sectionProjectsImages.forEach((e) => {
      e.classList.remove("section-projects-image-not-active");
    });
  }
}

const projectsTabs = new ProjectsTabs();
