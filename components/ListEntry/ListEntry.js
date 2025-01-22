import { wantedDelete } from "../../modalContent.js";
import Modal from "../Modal/Modal.js";

export default function ListEntry(element) {
  const listEntry = document.createElement("article");
  listEntry.classList.add("listEntry");
  listEntry.setAttribute("id", `${element.id}`);
  listEntry.innerHTML = /* html */ `

  <div>
<h3>Entry from ${element.date}, ${element.time}</h3><button class = "delete_button" data-js="detail-delete-button">X</button></div>
<p class="detail_paragraph">Project: ${element.project} </p>
<p class="detail_paragraph">Task: ${element.task} </p>
<p class="detail_paragraph">Category: ${element.category} </p>
<p class="detail_paragraph">Time spent: ${element.timeSpent}</p>
<p class="detail_paragraph">Id: ${element.id} </p>
  
  `;
  const deleteButton = listEntry.querySelector(
    '[data-js="detail-delete-button"]'
  );
  deleteButton.addEventListener("click", handleAreYouSure);

  function handleAreYouSure() {
    const id = element.id;
    listEntry.append(Modal(wantedDelete, id));
  }

  return listEntry;
}
