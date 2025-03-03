import EntryDetails from "../EntryDetails/EntryDetails.js";
import Modal from "../Modal/Modal.js";
import FormContainer from "../FormContainer/FormContainer.js";
import Edit from "../Edit/Edit.js";

export default function ListEntry(element) {
  const { date, time, task, id } = element;

  //make id even for toggle counter
  let counter = id % 2 != 0 ? id + 1 : id;

  const formattedTime = time.slice(0, 5);

  const listEntry = document.createElement("article");
  listEntry.classList.add("listEntry");
  listEntry.setAttribute("id", `${id}`);

  listEntry.innerHTML = /* html */ `
    <button class = "delete_button" data-js="detail-delete-button">X</button>
    <h3>${task}</h3>
    <p class="date_time">  ${date}, ${formattedTime}</p>
    <button class="edit_button" data-js="edit-button">edit</button>
    <button class="detail_button" data-js="detail-button">more details</button>
  `;

  const editButton = listEntry.querySelector('[data-js="edit-button"]');
  editButton.addEventListener("click", handleEdit);
  const deleteButton = listEntry.querySelector(
    '[data-js="detail-delete-button"]'
  );
  deleteButton.addEventListener("click", handleAreYouSure);
  const detailButton = listEntry.querySelector('[data-js="detail-button"]');
  detailButton.addEventListener("click", handleShowDetails);

  function handleEdit() {
    const id = element.id;
    const listContainer = document.getElementById("list-container");
    listContainer.remove();
    app.append(Edit(id));
  }

  function handleAreYouSure() {
    const id = element.id;
    listEntry.append(Modal("delete", id));
  }

  function handleShowDetails() {
    const entryDetails = document.getElementById(`${element.id}d`);
    const detailButton = listEntry.querySelector('[data-js="detail-button"]');

    if (counter % 2 === 0) {
      listEntry.append(EntryDetails(element));
      detailButton.textContent = "close details";
    } else {
      entryDetails.remove();
      detailButton.textContent = "more details";
    }
    ++counter;
  }

  return listEntry;
}
