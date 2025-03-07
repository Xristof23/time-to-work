import { dateOptions } from "../../utils.js";
import EditForm from "./EditForm.js";

const today = new Date();
let localDate = today.toLocaleDateString("en-EN", dateOptions);

export default function Edit(id) {
  const editContainer = document.createElement("section");
  editContainer.setAttribute("id", "edit-container");
  editContainer.classList.add("edit_container");
  const recordedTasks = JSON.parse(localStorage.getItem("RecordedTasks")) || [];
  const entryToEdit = recordedTasks.filter((entry) => entry.id === id)[0];
  const { date, time } = entryToEdit;

  editContainer.innerHTML = /*html*/ `
    <h2> 
    Edit your entry
    </h2>
    <p>from ${date}, ${time}:
    </p>
  `;
  editContainer.appendChild(EditForm(entryToEdit));

  return editContainer;
}
