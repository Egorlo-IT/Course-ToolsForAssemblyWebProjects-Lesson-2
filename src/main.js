import "./css/style.css";

import { toggle } from "./js/toggle.js";
import { timer } from "./js/timer.js";
import { datesCalculator } from "./js/datesCalculator.js";

const main = async () => {
  await toggle();
  timer();
  datesCalculator();
};

main();
