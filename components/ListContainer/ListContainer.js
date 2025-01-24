import TimeRecords from "../TimeRecords/TimeRecords.js";
import { wantedDeleteAll } from "../../modalContent.js";
import Modal from "../Modal/Modal.js";

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");
  listContainer.innerHTML = /*html*/ `
    <h2>My entries</h2>
        <button type="button" class="delete-all_button"  data-js="delete-all-button">
   Delete all
    </button>
`;
  const advancedButton = listContainer.querySelector(
    '[data-js="delete-all-button"]'
  );
  advancedButton.addEventListener("click", handleDeleteAll);

  listContainer.append(TimeRecords(userEntries));

  function handleDeleteAll() {
    // const timeRecords = document.querySelector(".time-records");
    listContainer.append(Modal(wantedDeleteAll));
  }

  return listContainer;
}
