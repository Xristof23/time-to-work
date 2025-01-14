import { properTimeFormatter } from "../../utils.js";
import ListEntry from "../ListEntry/ListEntry.js";

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
  const mainTiming = document.createElement("form");
  mainTiming.classList.add("mainTiming");
  mainTiming.innerHTML = /*html*/ `
    <p> 
    Explain later how this works
    </p>
    <p>Date: ${localDate}
    </p>
    <p>Time: ${localTime}
    </p> 
    
    <label for="project" class="label_standard">Project: 
    <input class="input_text" name="project" id="project" data-js="project" /> 
    </label> 
    <br/>
    <label for="task" class="label_standard">Task: 
    <input class="input_text" name="task" id="task" data-js="task"/> 
    </label> 
    
   <p>Start: <output data-js="start-output"></output></p> 
   <p>End: <output data-js="end-output"></output></p> 
   <p>Time spent: <output data-js="time-output"></output></p> 
   
    <button type="button" data-js="start-button">
    Start 
    </button>
    <button type="button" class="stop_button" data-js="stop-button">
    Stop
    </button>
    <button type="submit" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button" data-js="reset-button">
    Reset
    </button>
    <button type="button" class="stop_button" data-js="delete-button">
    Delete last
    </button>`;

  const startOutput = mainTiming.querySelector('[data-js="start-output"]');
  const timeOutput = mainTiming.querySelector('[data-js="time-output"]');
  const endOutput = mainTiming.querySelector('[data-js="end-output"]');

  const startButton = mainTiming.querySelector('[data-js="start-button"]');
  startButton.addEventListener("click", handleStart);
  const stopButton = mainTiming.querySelector('[data-js="stop-button"]');
  stopButton.addEventListener("click", handleStop);

  const deleteButton = mainTiming.querySelector('[data-js="delete-button"]');
  deleteButton.addEventListener("click", handleDelete);

  function handleDelete() {
    console.log("delete");
    const recordedTasks =
      JSON.parse(localStorage.getItem("RecordedTasks")) || [];
    recordedTasks.splice(0, 1);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));
    location.reload();
  }

  function handleStart() {
    startValue = Date.now();
    const startDate = new Date(startValue);
    const startTime = startDate.toLocaleTimeString("en-EN", timeOptions);

    startOutput.textContent = startTime;
  }

  function handleStop() {
    const endValue = Date.now();
    timespan = endValue - startValue;
    const formattedTimespan = properTimeFormatter(timespan);
    const endDate = new Date(endValue);
    const formattedEnd = endDate.toLocaleTimeString("en-EN", timeOptions);
    endOutput.textContent = formattedEnd;
    timeOutput.textContent = formattedTimespan;
  }

  // function handleFormSubmit(event) {
  //   event.target.reset();
  //   event.target.elements.question.focus();
  // }

  function handleSave(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const recordedTasks =
      JSON.parse(localStorage.getItem("RecordedTasks")) || [];

    const newEntry = {
      project: data.project,
      task: data.task,
      date: localDate,
      time: localTime,
      timespan,
      timeSpent: properTimeFormatter(timespan),
    };
    recordedTasks.unshift(newEntry);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));
    // To prevent the need to rerender, add the new entry to the DOM directly
    // const timeRecords = document.querySelector(".time-records");
    // const newListEntry = ListEntry(newEntry);
    // timeRecords.prepend(newListEntry);
    location.reload();
  }

  mainTiming.addEventListener("submit", handleSave);

  function handleReset() {
    alert(
      "Do you really want to reset? Have you saved your work? press esc if you are not sure"
    );
    timespan = 0;
    startOutput.textContent = 0;
    endOutput.textContent = 0;
    timeOutput.textContent = 0;
  }

  const resetButton = mainTiming.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  return mainTiming;
}
