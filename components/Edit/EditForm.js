import {
  properTimeFormatter,
  dateOptions,
  timeOptions,
  timeReset,
} from "../../utils.js";

import Modal from "../Modal/Modal.js";

export default function EditForm(entryToEdit) {
  const { id, task, project, category, note, timeSpent } = entryToEdit;
  const editForm = document.createElement("form");
  editForm.setAttribute("id", "edit-form");
  editForm.classList.add("edit_form");

  editForm.innerHTML = /*html*/ `
     <label for="task" class="label_standard_11">Task:*
    </label>
    <input required class="input_text_21" name="task" id="task" data-js="task"/>
    <label for="project" class="label_standard_12">Project:*
    </label>
     <input required class="input_text_22" name="project" id="project" data-js="project" />
     <label for="category" class="label_standard_13">Category:
      </label>
    <input class="input_text_23" name="category" id="category" data-js="category"/>
  <label for="Note" class="label_standard_14">Note:
    </label>
 <input  class="input_text_24" name="note" id="note" data-js="note"/>
   <label for="time-spent" class="label_standard_15">Timespan:
    </label>
 <input  class="input_text_25" name="timeSpent" id="time-spent" data-js="time-spent" />
   <div class="edit-form_buttons">
    <button type="submit" class="save_button--active" data-js="save-button">
    Save
    </button>
    <button type="button" class="stop_button--active" data-js="reset-button">
    Reset
    </button>
    </div>
  `;

  const taskInput = editForm.querySelector('[data-js="task"]');
  taskInput.value = task;
  const projectInput = editForm.querySelector('[data-js="project"]');
  projectInput.value = project;
  const categoryInput = editForm.querySelector('[data-js="category"]');
  categoryInput.value = category;
  const noteInput = editForm.querySelector('[data-js="note"]');
  noteInput.value = note;
  const timespanInput = editForm.querySelector('[data-js="time-spent"]');
  timespanInput.value = timeSpent;

  const resetButton = editForm.querySelector('[data-js="reset-button"]');
  resetButton.addEventListener("click", handleEditReset);

  editForm.addEventListener("submit", checkBeforeSubmit);

  function checkBeforeSubmit(event) {
    event.preventDefault();
    editForm.appendChild(Modal("edit", id, entryToEdit));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const currentDate = new Date();
    const localTime = currentDate.toLocaleTimeString("en-EN", timeOptions);

    const changedEntry = {
      ...entryToEdit,
      project: data.project,
      task: data.task,
      category: data.category,
      note: data.note,
      timeOfChange: localTime,
      timeSpent: data.timeSpent,
    };
    console.log(changedEntry);
    // const recordedTasks =
    //   JSON.parse(localStorage.getItem("RecordedTasks")) || [];
    // recordedTasks.map((entry) => (entry.id === id ? changedEntry : entry));
    // localStorage.setItem("RecordedTasks", JSON.stringify(recordedTasks));

    // editForm.append(Modal("afterSave"));
  }

  function handleEditReset(event) {
    // event.target.reset();
    // event.target.elements.project.focus();
    console.log("edit reset");
  }

  return editForm;
}
