import {
  properTimeFormatter,
  createUnixTimeID,
  dateOptions,
  timeOptions,
  timeReset,
} from "../../utils.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Modal from "../Modal/Modal.js";

//"modul globals"

const today = new Date();

let localDate = today.toLocaleDateString("en-EN", dateOptions);
let localTime = today.toLocaleTimeString("en-EN", timeOptions);

export default function MainForm(props) {
  const mainForm = document.createElement("form");
  mainForm.setAttribute("id", "main-form");
  mainForm.classList.add("main_form");

  mainForm.innerHTML = /*html*/ `
     <label for="task" class="label_standard_11">Task:*
    </label>
    <input class="input_text_21" name="task" id="task" required data-js="task"/>
   
    <label for="project" class="label_standard_12">Project:*
    </label>
     <input class="input_text_22" name="project" id="project" required data-js="project" />
     <label for="category" class="label_standard_13">Category:
      </label>
    <input class="input_text_23" name="category" id="category" data-js="category"/>
  <label for="Note" class="label_standard_14">Note:
    </label>
 <input class="input_text_24" name="note" id="note" data-js="note"/>
   <div class="form_buttons">
    <button type="submit" class="save_button" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset form
    </button>
    </div>
  `;

  //need this line?
  const saveButton = mainForm.querySelector('[data-js="save-button"]');

  const resetButton = mainForm.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleReset);

  mainForm.addEventListener("submit", checkBeforeSubmit);

  function checkBeforeSubmit(event) {
    event.preventDefault();
    timingProps.timespan === 0
      ? mainForm.append(Modal("save"))
      : handleSubmit(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const recordedTasks =
      JSON.parse(localStorage.getItem("RecordedTasks")) || [];

    const newEntry = {
      id: createUnixTimeID(timingProps.startValue),
      startValue: timingProps.startValue,
      project: data.project,
      task: data.task,
      category: data.category,
      note: data.note,
      date: localDate,
      time: localTime,
      timespan: timingProps.timespan,
      timeSpent: properTimeFormatter(timingProps.timespan),
    };
    recordedTasks.unshift(newEntry);
    localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));

    // const app = document.getElementById("app");
    // const listContainer = document.getElementById("list-container");
    // if (!listContainer) {
    //   app.append(ListContainer(recordedTasks));
    // } else {
    //   listContainer.remove();
    //   app.append(ListContainer(recordedTasks));
    // }

    // const doneTasksButton = document.querySelector(
    //   '[data-js="done-tasks-button"]'
    // );
    // doneTasksButton.classList.toggle("menu_button--active");

    timingProps.timespan = 0;
    timeReset();

    event.target.reset();
    event.target.elements.project.focus();
    mainForm.append(Modal("afterSave"));
  }

  function handleReset() {
    mainForm.append(Modal("reset"));
  }

  return mainForm;
}
