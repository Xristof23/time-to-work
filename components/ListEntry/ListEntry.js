import { wantedDelete } from "../../modalContent.js";
import EntryDetails from "../EntryDetails/EntryDetails.js";
import Modal from "../Modal/Modal.js";
let counter = 0;

export default function ListEntry(element) {
  const listEntry = document.createElement("article");
  listEntry.classList.add("listEntry");
  listEntry.setAttribute("id", `${element.id}`);
  listEntry.innerHTML = /* html */ `
   <button class = "delete_button" data-js="detail-delete-button">X</button>
  <h3>Entry from ${element.date}, ${element.time}</h3>
  <p class="task">Task: ${element.task} </p>
 
  
  <button class="detail_button" data-js="detail-button">more details</button>
  `;

  const deleteButton = listEntry.querySelector(
    '[data-js="detail-delete-button"]'
  );
  deleteButton.addEventListener("click", handleAreYouSure);
  const detailButton = listEntry.querySelector('[data-js="detail-button"]');
  detailButton.addEventListener("click", handleShowDetails);

  function handleAreYouSure() {
    const id = element.id;
    listEntry.append(Modal(wantedDelete, id));
  }

  function handleShowDetails() {
    const entryDetails = document.getElementById(`${element.id}d`);
    counter % 2 === 0
      ? listEntry.append(EntryDetails(element))
      : entryDetails.remove();
    ++counter;
  }

  return listEntry;
}
