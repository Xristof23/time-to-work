import { wantedReset, wantedSave, wantTest } from "../../modalContent.js";
import { properTimeFormatter } from "../../utils.js";
import ListEntry from "../ListEntry/ListEntry.js";
import Modal from "../Modal/Modal.js";

let startValue;

let timespan = 0;

let idCounter = 0;

let timerRunning = false;

function createUID() {
  const unixDate = Date.now();
  const firstNumber = Math.floor(unixDate / 1000);
  const firstPart = firstNumber.toString().slice(2);
  ++idCounter;
  const secondPart = idCounter.toLocaleString("en-US", {
    minimumIntegerDigits: 3,
    useGrouping: false,
  });
  const newId = firstPart + "C" + secondPart;
  return newId;
}

const today = new Date();

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const timeOptions = {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

export default function MainTiming() {
  const mainTiming = document.createElement("form");
  mainTiming.setAttribute("id", "main-form");
  mainTiming.classList.add("mainTiming");
  mainTiming.innerHTML = /*html*/ `
    <p> 
    Explain later how this works
    </p>
    <p>Date:  <output data-js="date-output">${localDate}</output>
    </p>
    <p>Time: <output data-js="time-output">${localTime}</output> 
    </p> 
    
    <label for="project" class="label_standard">Project: 
    <input class="input_text" name="project" id="project" required data-js="project" /> 
    *</label> 
    <br/>
    <label for="task" class="label_standard">Task: 
    <input class="input_text" name="task" id="task" required data-js="task"/> 
    *</label> 
     <br/>
     <label for="category" class="label_standard">Category: 
    <input class="input_text" name="category" id="category" data-js="category"/> 
    </label> 
    
   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="timespan-output"></output></p> 
   
    <button type="button" data-js="start-button">
    Start 
    </button>
    <button type="button" class="stop_button" data-js="stop-button">
    Stop
    </button>
    <button type="submit" class="save_button" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button" data-js="reset-button">
    Reset
    </button>
        <button type="button" class="test_button" data-js="test-button">
    Test
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
  const testButton = mainTiming.querySelector('[data-js="test-button"]');
  startButton.addEventListener("click", handleStart);
  stopButton.addEventListener("click", handleStop);
  mainTiming.addEventListener("submit", checkBeforeSubmit);
  testButton.addEventListener("click", handleTest);

  function handleStart() {
    timerRunning = true;
    startValue = Date.now();
    const startDate = new Date(startValue);
    localDate = startDate.toLocaleDateString("en-EN", dateOptions);
    localTime = startDate.toLocaleTimeString("en-EN", timeOptions);
    dateOutput.textContent = localDate;
    timeOutput.textContent = localTime;
    startOutput.textContent = localTime;
  }

  function handleStop() {
    timerRunning = false;
    saveButton.classList.add("save_button--active");
    const endValue = Date.now();
    timespan = endValue - startValue;
    const formattedTimespan = properTimeFormatter(timespan);
    const endDate = new Date(endValue);
    const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
    endOutput.textContent = formattedEnd;
    timespanOutput.textContent = formattedTimespan;
  }

  function handleTest() {
    mainTiming.append(Modal(wantTest));
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
      id: createUID(),
      startValue,
      project: data.project,
      task: data.task,
      category: data.category,
      date: localDate,
      time: localTime,
      timespan,
      timeSpent: properTimeFormatter(timespan),
    };
    recordedTasks.unshift(newEntry);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));

    const timeRecords = document.querySelector(".time-records");
    const newListEntry = ListEntry(newEntry);
    timeRecords.prepend(newListEntry);
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
