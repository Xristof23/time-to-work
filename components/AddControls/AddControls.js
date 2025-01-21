import { wantedDeleteAll } from "../../modalContent.js";
import Modal from "../Modal/Modal.js";

export default function () {
  const addControls = document.createElement("div");
  addControls.classList.add("addControls");
  addControls.setAttribute("id", "add-controls1");
  addControls.innerHTML = /* html */ `
    <button class="delete_all_button" data-js="delete-all">Delete all Entries</button>
    `;

  const deleteAll = addControls.querySelector('[data-js="delete-all"]');
  deleteAll.addEventListener("click", handleDeleteAll);

  function handleDeleteAll() {
    const timeRecords = document.querySelector(".time-records");
    timeRecords.append(Modal(wantedDeleteAll));
  }

  return addControls;
}
