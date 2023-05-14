//---------------
//  Transition
//---------------
class Transition {
  constructor(selector) {
    // Selectors
    this.transitionElements = document.querySelectorAll(selector);
    this.handleTransition = this.handleTransition.bind(this);
    // Calling the transitions
    this.init();
  }

  // Adding class when in View
  handleTransition(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Stop observing after adding class
      }
    });
  }

  // Creating the transition
  init() {
    this.transitionElements.forEach((element) => {
      const observer = new IntersectionObserver((entries) =>
        this.handleTransition(entries, observer)
      );
      observer.observe(element);
    });
  }
}

// Selecting the elements
const transition = new Transition(".transition");
