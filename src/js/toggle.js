export const toggle = async () => {
  const elSectionTimer = document.querySelector(".timer");
  const elSectionDateCalculator = document.querySelector(".date-calculator");

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-item").forEach((el) => {
        el.classList.remove("active-nav");
      });
      e.target.classList.add("active-nav");

      if (e.target.textContent === "Timer") {
        elSectionTimer.className = "section timer active-section";
        elSectionDateCalculator.className = "section date-calculator";
      } else {
        elSectionTimer.className = "section timer";
        elSectionDateCalculator.className =
          "section date-calculator active-section";
      }
    });
  });
};
