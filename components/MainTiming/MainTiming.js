import { properTimeFormatter } from "../../utils.js";

let startValue;

let timespan = 0;

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

const localDate = today.toLocaleDateString("en-EN", dateOptions);
const localTime = today.toLocaleTimeString("en-EN", timeOptions);

export default function MainTiming() {
  const mainTiming = document.createElement("section");
  mainTiming.classList.add("mainTiming");
  mainTiming.innerHTML = /*html*/ `
    <p> 
    Explain later how this works
    </p>
    <p>Date: ${localDate}
    </p>
    <p>Time: ${localTime}
    </p> 
    <form>
    <label class="label_standard">Project: <input class="input_text"id="project" data-js="project" /> 
    </label> 
    <br/>
    <label class="label_standard">Task: <input class="input_text"/> 
    </label> 
    </form>
   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="time-output"></output></p> 
   
    <button type="button" data-js="start-button">
    Start 
    </button>
    <button type="button" class="stop_button" data-js="stop-button">
    Stop
    </button>
    <button type="button" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button" data-js="reset-button">
    Reset
    </button>`;

  const startOutput = mainTiming.querySelector('[data-js="start-output"]');
  const timeOutput = mainTiming.querySelector('[data-js="time-output"]');
  const endOutput = mainTiming.querySelector('[data-js="end-output"]');

  const startButton = mainTiming.querySelector('[data-js="start-button"]');

  function handleStart() {
    startValue = Date.now();
    const startDate = new Date(startValue);
    const startTime = startDate.toLocaleTimeString("en-EN", timeOptions);

    startOutput.textContent = startTime;
  }

  startButton.addEventListener("click", handleStart);

  const stopButton = mainTiming.querySelector('[data-js="stop-button"]');

  function handleStop() {
    const endValue = Date.now();
    timespan = endValue - startValue;
    const formattedTimespan = properTimeFormatter(timespan);
    const endDate = new Date(endValue);
    const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
    endOutput.textContent = formattedEnd;
    timeOutput.textContent = formattedTimespan;
    // return formattedTimespan;
  }

  stopButton.addEventListener("click", handleStop);

  function handleSave() {
    console.log("handle save");
    const recordedTasks =
      JSON.parse(localStorage.getItem("RecordedTasks")) || [];
    console.log("recordedTasks from Maintiming", recordedTasks);

    const newEntry = {
      date: localDate,
      timespan,
      timeSpent: properTimeFormatter(timespan),
    };
    recordedTasks.push(newEntry);
    console.log(recordedTasks);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));
  }

  const saveButton = mainTiming.querySelector('[data-js="save-button"]');
  saveButton.addEventListener("click", handleSave);

  function handleReset() {
    alert("Do you really want to reset? Have you saved your work?");
    timespan = 0;
    startOutput.textContent = 0;
    endOutput.textContent = 0;
    timeOutput.textContent = 0;
    console.log("reset");
  }

  const resetButton = mainTiming.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return mainTiming;
}
