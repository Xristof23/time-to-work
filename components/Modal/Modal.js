import { modalContentList } from "../../modalContent.js";
import { noTasksContent } from "../../textContent.js";
import { saveToLocalStorage, timeReset } from "../../utils.js";
import Article from "../Article/Article.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";

export default function Modal(keyWord, id) {
  const props = modalContentList.filter((el) => el.mode === keyWord);
  const { text, button1, button2, button3, mode } = props[0];

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal1");
  const idText = id ? `${id}!` : "";
  modal.innerHTML = /*html*/ `
    <p> ${text} ${idText}</p>
    <button type="button" data-js="no-button" >
    ${button1}
    </button>
    <button type="button" class="yes_button" data-js="yes-button">
    ${button2}
    </button> 
       <button type="button" class="yes_button" data-js="third-button">
    ${button3}
    </button> 
    `;

  const noButton = modal.querySelector('[data-js="no-button"]');
  noButton.addEventListener("click", handleAbort);
  const yesButton = modal.querySelector('[data-js="yes-button"]');
  yesButton.addEventListener("click", handleYes);

  const thirdButton = modal.querySelector('[data-js="third-button"');
  thirdButton.addEventListener("click", handleThird);

  !button2 && yesButton.classList.add("button--passive");
  !button3 && thirdButton.classList.add("button--passive");

  function handleAbort() {
    modal.remove();
  }

  function handleYes() {
    switch (mode) {
      case "resetTime":
        timeReset();
        modal.remove();
        break;
      case "reset":
        formReset();
        break;
      case "delete":
        deleteEntry(id);
        break;
      case "deleteAll":
        deleteAllEntries();
        break;
      case "chooseBackup":
        const userEntries = JSON.parse(localStorage.getItem("TasksBackup"));
        const timeRecords = document.getElementById("time-records");
        timeRecords.replaceWith(TimeRecords(userEntries));
        saveToLocalStorage(userEntries, "RecordedTasks");
        modal.remove();
        break;
    }
  }

  function handleThird() {
    let userEntries = JSON.parse(localStorage.getItem("AutomaticBackup"));
    saveToLocalStorage(userEntries, "RecordedTasks");
    const timeRecords = document.getElementById("time-records");
    timeRecords.replaceWith(TimeRecords(userEntries));
    modal.remove();
  }

  function formReset() {
    const form = document.getElementById("main-form");
    form.reset();
    modal.remove();
  }

  function deleteEntry(id) {
    const userEntries = JSON.parse(localStorage.getItem("RecordedTasks"));
    const updatedEntries = userEntries.filter((entry) => entry.id != id);
    const entryToDelete = document.getElementById(`${id}`);
    entryToDelete.remove();
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    modal.remove();
    const listContainer = document.getElementById("list-container");
    updatedEntries.length === 0 &&
      listContainer.appendChild(Article(noTasksContent));
  }

  function deleteAllEntries() {
    const updatedEntries = [];
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    modal.remove();
    const timeRecords = document.getElementById("time-records");
    timeRecords.replaceWith(Article(noTasksContent));
  }

  return modal;
}
