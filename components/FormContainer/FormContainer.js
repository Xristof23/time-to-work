import { wantedReset, wantedSave, wantedStart } from "../../modalContent.js";
import {
  properTimeFormatter,
  createUnixTimeID,
  dateOptions,
  timeOptions,
} from "../../utils.js";
import Clock from "../Clock/Clock.js";
import MiniClock from "../MiniClock/MiniClock.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Modal from "../Modal/Modal.js";
import MainForm from "../MainForm/MainForm.js";

//"modul globals"
let startValue;

let timespan = 0;

let timerRunning = false;

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

let intervalId;

const clockProps = { start: false, test: "test" };
const formProps = { timerRunning };

export default function FormContainer() {
  const formContainer = document.createElement("section");
  formContainer.setAttribute("id", "form-container");
  formContainer.classList.add("form_container");

  formContainer.innerHTML = /*html*/ `
    <h2> 
    New task
    </h2>
    <p>Date:  <output data-js="date-output">${localDate}</output>
    </p>


   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="timespan-output"></output></p> 
   
    <button type="button" data-js="start-button">
    start 
    </button>
    <button type="button" class="stop_button--passive" data-js="stop-button">
    stop
    </button>

    <button type="button" class="stop_button--active" data-js="reset-button">
    reset timer
    </button>
  `;
  formContainer.appendChild(MainForm(formProps));
  const dateOutput = formContainer.querySelector('[data-js="date-output"]');
  const startOutput = formContainer.querySelector('[data-js="start-output"]');
  const timespanOutput = formContainer.querySelector(
    '[data-js="timespan-output"]'
  );
  const endOutput = formContainer.querySelector('[data-js="end-output"]');

  const startButton = formContainer.querySelector('[data-js="start-button"]');
  const stopButton = formContainer.querySelector('[data-js="stop-button"]');
  //   const saveButton = formContainer.querySelector('[data-js="save-button"]');

  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);

  function handleStart() {
    if (timerRunning) {
      formContainer.append(Modal(wantedStart));
    } else {
      clockProps.start = true;
      formContainer.appendChild(MiniClock(clockProps));
      timerRunning = true;
      stopButton.classList.toggle("stop_button--active");
      startValue = Date.now();
      handleUpdateTime();
      const startDate = new Date(startValue);
      localDate = startDate.toLocaleDateString("en-EN", dateOptions);
      localTime = startDate.toLocaleTimeString("en-EN", timeOptions);
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
    if (timerRunning === false) {
      formContainer.append(Modal(wantedSave));
    } else {
      const mainForm = document.getElementById("main-form");
      const saveButton = mainForm.querySelector('[data-js="save-button"]');
      saveButton.classList.add("save_button--active");
      const endValue = Date.now();
      timespan = endValue - startValue;
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
    formContainer.append(Modal(wantedReset));
  }

  const resetButton = formContainer.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return formContainer;
}
