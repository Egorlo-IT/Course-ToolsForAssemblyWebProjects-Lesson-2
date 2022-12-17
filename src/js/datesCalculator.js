import { diffDates, diffToHtml } from "./datesHandler.js";
import { errorMessage } from "./errorMessage.js";

const elBtnSubmit = document.querySelector(".btn-submit-date-calculator");
const elResult = document.querySelector(".result-date-calculator");

export const datesCalculator = () => {
  elBtnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const firstDate = event.target.form.elements.firstDate.value;
    const secondDate = event.target.form.elements.secondDate.value;

    if (firstDate && secondDate) {
      const diff = diffDates(firstDate, secondDate);
      elResult.innerHTML = diffToHtml(diff);
    } else elResult.innerHTML = errorMessage("Both date fields required");
  });
};
