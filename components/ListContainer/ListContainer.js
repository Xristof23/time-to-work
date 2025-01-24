import TimeRecords from "../TimeRecords/TimeRecords.js";
import { wantedDeleteAll, noEntries } from "../../modalContent.js";
import Modal from "../Modal/Modal.js";

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");

  listContainer.innerHTML = /*html*/ `
    <h2>Done tasks</h2>
        <button type="button" class="delete-all_button"  data-js="delete-all-button">
   Delete all
    </button>
`;
  const advancedButton = listContainer.querySelector(
    '[data-js="delete-all-button"]'
  );
  advancedButton.addEventListener("click", handleDeleteAll);

  // userEntries.length > 0 && listContainer.append(TimeRecords(userEntries));
  // userEntries.length === 0 && listContainer.append(Modal(noEntries));

  function handleDeleteAll() {
    listContainer.append(Modal(wantedDeleteAll));
  }

  return listContainer;
}
