import { noTasksContent } from "../../textContent.js";
import Article from "../Article/Article.js";

export default function Modal(props, id) {
  const { text, button1, button2, mode } = props;
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
    `;

  const noButton = modal.querySelector('[data-js="no-button"]');
  noButton.addEventListener("click", handleAbort);
  const yesButton = modal.querySelector('[data-js="yes-button"]');
  yesButton.addEventListener("click", handleYes);

  !props.button2 && yesButton.classList.add("button--passive");

  function handleYes() {
    switch (mode) {
      case "reset":
        realReset();
        break;
      case "delete":
        deleteEntry(id);
        break;
      case "deleteAll":
        deleteAllEntries();
        break;
    }
  }

  function handleAbort() {
    modal.remove();
  }

  function realReset() {
    const startOutput = document.querySelector('[data-js="start-output"]');
    const endOutput = document.querySelector('[data-js="end-output"]');
    const timeOutput = document.querySelector('[data-js="time-output"]');
    const timespanOutput = document.querySelector(
      '[data-js="timespan-output"]'
    );
    startOutput.textContent = "";
    endOutput.textContent = "";
    timeOutput.textContent = "";
    timespanOutput.textContent = "";
    modal.remove();
    const form = document.getElementById("main-form");
    form.reset();
  }
  function deleteEntry(id) {
    const userEntries = JSON.parse(localStorage.getItem("RecordedTasks"));
    const updatedEntries = userEntries.filter((entry) => entry.id != id);
    const entryToDelete = document.getElementById(`${id}`);
    entryToDelete.remove();
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    modal.remove();
    const listContainer = document.getElementById("list-container");
    updatedEntries.length === 0 && listContainer.append(What(noTasksContent));
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
