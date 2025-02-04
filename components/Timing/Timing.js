import { properTimeFormatter, dateOptions, timeOptions } from "../../utils.js";

import MiniClock from "../MiniClock/MiniClock.js";
import Modal from "../Modal/Modal.js";

//"modul globals"
let startValue;

let timespan = 0;

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

   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="timespan-output"></output></p> 
   
    <button type="button" data-js="start-button">
   Start
    </button>
    <button type="button" class="stop_button--passive" data-js="stop-button">
    Stop
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset Time
    </button>
  `;

  const dateOutput = timing.querySelector('[data-js="date-output"]');
  const startOutput = timing.querySelector('[data-js="start-output"]');
  const timespanOutput = timing.querySelector('[data-js="timespan-output"]');
  const endOutput = timing.querySelector('[data-js="end-output"]');

  const startButton = timing.querySelector('[data-js="start-button"]');
  const stopButton = timing.querySelector('[data-js="stop-button"]');

  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);

  timing.appendChild(MiniClock(clockProps));

  function handleStart() {
    if (timingProps.started) {
      timing.append(Modal("noStart"));
    } else {
      timingProps.started = true;
      stopButton.classList.toggle("stop_button--active");
      startValue = Date.now();
      timingProps.startValue = Date.now();
      handleUpdateTime();
      const startDate = new Date(startValue);
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
    const updatedTime = Date.now() - startValue;
    const formattedTime = properTimeFormatter(updatedTime);
    timespanOutput.textContent = formattedTime;
  }

  function handleStop() {
    if (timingProps.started === false) {
      timing.append(Modal("save"));
    } else {
      const saveButton = document.querySelector('[data-js="save-button"]');
      saveButton.classList.add("save_button--active");
      const endValue = Date.now();
      timespan = endValue - startValue;
      timingProps.timespan = timespan;
      const formattedTimespan = properTimeFormatter(timespan);
      const endDate = new Date(endValue);
      const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
      endOutput.textContent = formattedEnd;
      timespanOutput.textContent = formattedTimespan;
      timerRunning = false;
      stopButton.classList.toggle("stop_button--active");
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleReset() {
    timing.append(Modal("resetTime"));
  }

  const resetButton = timing.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return timing;
}
