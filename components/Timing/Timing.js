import { properTimeFormatter, dateOptions, timeOptions } from "../../utils.js";

import MiniClock from "../MiniClock/MiniClock.js";
import Modal from "../Modal/Modal.js";

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

let intervalId;

const clockProps = { start: false, test: "test" };

export default function Timing() {
  const timing = document.createElement("div");
  timing.setAttribute("id", "main-form");
  timing.classList.add("timing");

  timing.innerHTML = /*html*/ `

   <p class="timing_paragraph">Start: <output data-js="start-output"></output></p>
   <p>End: <output data-js="end-output"></output></p>
   <p>Time spent: <output class="timespan_orange" data-js="timespan-output"></output></p>
   <div class="timing_buttons">
    <button type="button" data-js="start-button">
   Start
    </button>
    <button type="button" class="stop_button--passive" data-js="stop-button">
    Stop
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset
    </button>
    </div>
  `;

  const startOutput = timing.querySelector('[data-js="start-output"]');
  const timespanOutput = timing.querySelector('[data-js="timespan-output"]');
  const endOutput = timing.querySelector('[data-js="end-output"]');

  const startButton = timing.querySelector('[data-js="start-button"]');
  const stopButton = timing.querySelector('[data-js="stop-button"]');

  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);

  timing.appendChild(MiniClock(clockProps));

  //may add destructure later
  const continueProps = JSON.parse(localStorage.getItem("continueProps")) || {};
  console.log("timingprops.started: ", timingProps.started);
  console.log("continueProps.started: ", continueProps.started);
  // continue restart
  if (timingProps.started && continueProps.started) {
    handleStart();
  }

  function handleStart() {
    if (timingProps.started && !continueProps.started) {
      timing.append(Modal("noStart"));
    } else {
      timingProps.started = true;
      stopButton.classList.toggle("stop_button--active");
      timingProps.startValue = continueProps.startValue
        ? continueProps.startValue
        : Date.now();
      console.log("timingprops: ", timingProps);
      localStorage.setItem("continueProps", JSON.stringify(timingProps));
      handleUpdateTime();
      const startDate = new Date(timingProps.startValue);
      localDate = startDate.toLocaleDateString("en-EN", dateOptions);
      localTime = startDate.toLocaleTimeString("en-EN", timeOptions);

      const dateOutput = document.querySelector('[data-js="date-output"]');
      dateOutput.textContent = localDate;
      startOutput.textContent = localTime;
      endOutput.textContent = "time is running ...";
    }
  }

  function handleUpdateTime() {
    if (!intervalId) {
      intervalId = setInterval(updateTime, 1000);
    }
  }

  function updateTime() {
    const updatedTime = Date.now() - timingProps.startValue;
    timingProps.timespan = updatedTime;
    const formattedTime = properTimeFormatter(updatedTime);
    timingProps.formattedTimespan = formattedTime;
    timespanOutput.textContent = formattedTime;
    if (timingProps.haltTimer === true) {
      autoStop();
    }
  }

  function autoStop() {
    console.log("stopped");
    const endValue = Date.now();
    timingProps.timespan = endValue - timingProps.startValue;
    const formattedTimespan = properTimeFormatter(timingProps.timespan);
    timingProps.formattedTimespan = formattedTimespan;
    const endDate = new Date(endValue);
    const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
    //  endOutput.textContent = formattedEnd;
    timespanOutput.textContent = formattedTimespan;
    stopButton.classList.toggle("stop_button--active");
    clearInterval(intervalId);
    intervalId = null;
  }

  function handleStop() {
    if (timingProps.started === false) {
      timing.append(Modal("save"));
    } else {
      const saveButton = document.querySelector('[data-js="save-button"]');
      saveButton.classList.add("save_button--active");
      const endValue = Date.now();
      timingProps.timespan = endValue - timingProps.startValue;
      const formattedTimespan = properTimeFormatter(timingProps.timespan);
      timingProps.formattedTimespan = formattedTimespan;
      const endDate = new Date(endValue);
      const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
      endOutput.textContent = formattedEnd;
      timespanOutput.textContent = formattedTimespan;
      timingProps.started = false;
      stopButton.classList.toggle("stop_button--active");
      clearInterval(intervalId);
      intervalId = null;
      //reset "memory"
      localStorage.setItem("continueProps", JSON.stringify({}));
    }
  }

  function handleReset() {
    timing.append(Modal("resetTime"));
  }

  const resetButton = timing.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return timing;
}
