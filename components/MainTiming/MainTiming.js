import { wantedReset, wantedSave, wantedStart } from "../../modalContent.js";
import {
  properTimeFormatter,
  createUnixTimeID,
  dateOptions,
  timeOptions,
} from "../../utils.js";
import Clock from "../Clock/Clock.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Modal from "../Modal/Modal.js";

//"modul globals"
let startValue;

let timespan = 0;

let timerRunning = false;

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

let intervalId;

export default function MainTiming() {
  const mainTiming = document.createElement("form");
  mainTiming.setAttribute("id", "main-form");
  mainTiming.classList.add("mainTiming");

  mainTiming.innerHTML = /*html*/ `
    <h2> 
    New task
    </h2>
    <p>Date:  <output data-js="date-output">${localDate}</output>
    </p>
    <p>Time: <output data-js="time-output">${localTime}</output> 
    </p> 
     <label for="task" class="label_standard">Task: 
    <input class="input_text" name="task" id="task" required data-js="task"/> 
    *</label> 
     <br/>
    <label for="project" class="label_standard">Project: 
    <input class="input_text" name="project" id="project" required data-js="project" /> 
    *</label> 
     <br/>
     <label for="category" class="label_standard">Category: 
    <input class="input_text" name="category" id="category" data-js="category"/> 
    </label> 
    <br/>
     <label for="Note" class="label_standard">Note: 
    <input class="input_text" name="note" id="note" data-js="note"/> 
    </label> 
   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="timespan-output"></output></p> 
   
    <button type="button" data-js="start-button">
    Start 
    </button>
    <button type="button" class="stop_button--passive" data-js="stop-button">
    Stop
    </button>
    <button type="submit" class="save_button" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset
    </button>
    
  `;

  const dateOutput = mainTiming.querySelector('[data-js="date-output"]');
  const timeOutput = mainTiming.querySelector('[data-js="time-output"]');
  const startOutput = mainTiming.querySelector('[data-js="start-output"]');
  const timespanOutput = mainTiming.querySelector(
    '[data-js="timespan-output"]'
  );
  const endOutput = mainTiming.querySelector('[data-js="end-output"]');

  const startButton = mainTiming.querySelector('[data-js="start-button"]');
  const stopButton = mainTiming.querySelector('[data-js="stop-button"]');
  const saveButton = mainTiming.querySelector('[data-js="save-button"]');

  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);
  mainTiming.addEventListener("submit", checkBeforeSubmit);

  mainTiming.appendChild(Clock());

  function handleStart() {
    if (timerRunning) {
      mainTiming.append(Modal(wantedStart));
    } else {
      timerRunning = true;
      stopButton.classList.toggle("stop_button--active");
      startValue = Date.now();
      handleUpdateTime();
      const startDate = new Date(startValue);
      localDate = startDate.toLocaleDateString("en-EN", dateOptions);
      localTime = startDate.toLocaleTimeString("en-EN", timeOptions);
      dateOutput.textContent = localDate;
      timeOutput.textContent = localTime;
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
      mainTiming.append(Modal(wantedSave));
    } else {
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

  function checkBeforeSubmit(event) {
    event.preventDefault();
    timespan === 0 ? mainTiming.append(Modal(wantedSave)) : handleSubmit(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const recordedTasks =
      JSON.parse(localStorage.getItem("RecordedTasks")) || [];

    const newEntry = {
      id: createUnixTimeID(startValue),
      startValue,
      project: data.project,
      task: data.task,
      category: data.category,
      note: data.note,
      date: localDate,
      time: localTime,
      timespan,
      timeSpent: properTimeFormatter(timespan),
    };
    recordedTasks.unshift(newEntry);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));

    const app = document.getElementById("app");
    const listContainer = document.getElementById("list-container");
    if (!listContainer) {
      app.append(ListContainer(recordedTasks));
    } else {
      listContainer.remove();
      app.append(ListContainer(recordedTasks));
    }

    const doneTasksButton = document.querySelector(
      '[data-js="done-tasks-button"]'
    );
    doneTasksButton.classList.toggle("menu_button--active");
    timespan = 0;
    dateOutput.textContent = localDate;
    timeOutput.textContent = localTime;
    startOutput.textContent = "";
    endOutput.textContent = "";
    timespanOutput.textContent = "";

    event.target.reset();
    event.target.elements.project.focus();
  }

  function handleReset() {
    mainTiming.append(Modal(wantedReset));
  }

  const resetButton = mainTiming.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return mainTiming;
}
