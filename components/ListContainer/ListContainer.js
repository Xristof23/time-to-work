import TimeRecords from "../TimeRecords/TimeRecords.js";
import { wantedDeleteAll } from "../../modalContent.js";
import Modal from "../Modal/Modal.js";
import What from "../What/What.js";
import { noTasksContent } from "../../textContent.js";

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");

  listContainer.innerHTML = /*html*/ `
    <h2>Done tasks</h2>
    <button type="button" class="delete-all_button"  data-js="delete-all-button">
   delete all
    </button>
    <button type="button" class="backup_button" data-js="backup-button">
   make backup
    </button>
`;
  userEntries.length > 0
    ? listContainer.append(TimeRecords(userEntries))
    : listContainer.append(What(noTasksContent));

  const deleteAllButton = listContainer.querySelector(
    '[data-js="delete-all-button"]'
  );
  deleteAllButton.addEventListener("click", handleDeleteAll);

  const backupButton = listContainer.querySelector('[data-js="backup-button"]');
  backupButton.addEventListener("click", handleBackup);

  function handleBackup() {
    localStorage.setItem("TasksBackup", JSON.stringify(userEntries));
  }

  // userEntries.length > 0 && listContainer.append(TimeRecords(userEntries));
  // userEntries.length === 0 && listContainer.append(Modal(noEntries));

  function handleDeleteAll() {
    listContainer.append(Modal(wantedDeleteAll));
  }

  return listContainer;
}
