import { DateTime } from "luxon";
import { Howl } from "howler";
import { diffDates, diffToHtml } from "./datesHandler.js";
import { errorMessage } from "./errorMessage.js";
import soundfile from "../sounds/1.mp3";

const elForm = document.querySelector(".form-timer");
const elBtnSubmit = document.querySelector(".btn-submit-timer");
const elBtnReset = document.querySelector(".btn-reset-timer");
const elResult = document.querySelector(".result-timer");

let intervalId, targetDateTime, diff, idSound;

export const timer = () => {
  const currDateTime = DateTime.local();

  const sound = new Howl({
    src: soundfile,
    autoplay: false,
    loop: true,
    volume: 0.5,
  });

  const start = (hours, minutes, seconds) => {
    if (!targetDateTime) {
      targetDateTime = currDateTime.plus({
        hours: hours ? hours : 0,
        minutes: minutes ? minutes : 0,
        seconds: seconds ? seconds : 0,
      });
    }

    diff = diffDates(currDateTime, targetDateTime);
    elResult.innerHTML = diffToHtml(diff);

    intervalId = setInterval(() => {
      targetDateTime = targetDateTime.minus({
        seconds: 1,
      });
      diff = diffDates(currDateTime, targetDateTime);
      elResult.innerHTML = diffToHtml(diff);

      if (diff.hours === 0 && diff.minutes === 0 && diff.seconds < 20) {
        if (!sound.playing(idSound)) {
          idSound = sound.play();
        }
      }

      if (diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0) {
        targetDateTime = null;
        elBtnSubmit.textContent = "Start";
        elBtnReset.disabled = false;
        elBtnReset.classList.remove("disabled");
        elResult.innerHTML = '<span class="finish">Timer finished</span>';
        sound.stop();
        stop();
        reset();
      }
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
    sound.stop();
  };

  const reset = () => {
    targetDateTime = null;
  };

  elBtnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const hours = event.target.form.elements.hours.value;
    const minutes = event.target.form.elements.minutes.value;
    const seconds = event.target.form.elements.seconds.value;

    if (hours || minutes || seconds) {
      elBtnSubmit.classList.toggle("acive");
      if (elBtnSubmit.classList.contains("acive")) {
        elBtnSubmit.textContent = "Stop";
        elBtnReset.disabled = true;
        elBtnReset.classList.add("disabled");
        start(hours, minutes, seconds);
      } else {
        elBtnSubmit.textContent = "Start";
        elBtnReset.disabled = false;
        elBtnReset.classList.remove("disabled");
        stop();
      }
    } else
      elResult.innerHTML = errorMessage("One of the fields must be filled");
  });

  elBtnReset.addEventListener("click", (event) => {
    event.preventDefault();
    elForm.reset();
    elResult.innerHTML = "";
    reset();
  });
};
