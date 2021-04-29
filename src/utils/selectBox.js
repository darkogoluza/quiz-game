export class SelectBox {
  constructor(
    selector,
    { onOption = undefined, defaultValue = undefined, name = "" } = {}
  ) {
    this.main = document.querySelector(selector);

    this.optionsContainer = this.main.querySelector(".options-container");
    this.selectBoxBtn = this.main.querySelector(".selected-btn");
    this.options = this.main.querySelectorAll(".option");
    this.onOption = onOption;
    this.name = name;

    this.selectBoxBtn.addEventListener("click", () => {
      this.optionsContainer.classList.toggle("active");
    });

    this.options.forEach((option, index) => {
      option.addEventListener("click", () => {
        this.optionsContainer.classList.remove("active");

        this.deactivateOptions();
        this.makeOptionActive(option.textContent);
        if (this.onOption != null || this.onOption != undefined)
          this.onOption();
      });
    });

    this.makeOptionActive(this.getOptionIdByIndex(defaultValue));

    // Close select box on click away
    document.addEventListener("click", (e) => {
      if (!this.main.contains(e.target))
        this.optionsContainer.classList.remove("active");
    });
  }

  deactivateOptions() {
    this.options.forEach((item) => {
      item.classList.remove("active-option");
    });
  }

  makeOptionActive(optionId) {
    this.options.forEach((option) => {
      if (option.textContent === optionId) {
        option.classList.add("active-option");
        this.activeOptionId = optionId;
        this.selectBoxBtn.textContent = `${this.name} - ${optionId}`;
      }
    });
  }

  getOptionIdByIndex(index) {
    for (let i = 0; i < this.options.length; i++) {
      if (i === index) {
        return this.options[i].textContent;
      }
    }
  }
}
