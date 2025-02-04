import { wantedReset, wantedSave, wantedStart } from "../../modalContent.js";
import {
  properTimeFormatter,
  createUnixTimeID,
  dateOptions,
  timeOptions,
} from "../../utils.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Modal from "../Modal/Modal.js";

//"modul globals"
let startValue;

let timespan = 0;

let timerRunning = false;

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

export default function MainForm(props) {
  console.log(timingProps);
  const mainForm = document.createElement("form");
  mainForm.setAttribute("id", "main-form");
  mainForm.classList.add("main_form");

  mainForm.innerHTML = /*html*/ `
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
<br/>
   <div class="form_buttons">
   <p>Ok with your inputs?</p>
    <button type="submit" class="save_button" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset form
    </button>
    </div>
  `;

  const saveButton = mainForm.querySelector('[data-js="save-button"]');

  const resetButton = mainForm.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  mainForm.addEventListener("submit", checkBeforeSubmit);

  function checkBeforeSubmit(event) {
    event.preventDefault();
    timespan === 0 ? mainForm.append(Modal(wantedSave)) : handleSubmit(event);
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
    mainForm.append(Modal(wantedReset));
  }

  return mainForm;
}
