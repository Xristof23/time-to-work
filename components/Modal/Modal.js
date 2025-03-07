import { removeAndHideEverything, deActivate } from "../../menuLogic.js";
import { modalContentList } from "../../modalContent.js";
import { noTasksContent } from "../../textContent.js";
import { saveToLocalStorage, timeReset } from "../../utils.js";
// import Analysis from "../Analysis/Analysis.js";
import Article from "../Article/Article.js";
import ListContainer from "../ListContainer/ListContainer.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";

export default function Modal(keyWord, id, entryToEdit) {
  const props = modalContentList.filter((el) => el.mode === keyWord);
  const {
    argument,
    text,
    button1,
    button2,
    button3,
    firstFunction,
    secondFunction,
    style1,
    style2,
    style3,
    mode,
  } = props[0];

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal1");
  const idText = id && mode === "delete" ? `${id}!` : "";
  modal.innerHTML = /*html*/ `
    <p> ${text} ${idText}</p>
    <button type="button" class="modal_button--green" data-js="modal-button-1" >
    ${button1}
    </button>
    <button type="button" class="yes_button" data-js="modal-button-2">
    ${button2}
    </button> 
       <button type="button" class="yes_button" data-js="third-button">
    ${button3}
    </button> 
    `;

  const userEntries = JSON.parse(localStorage.getItem("RecordedTasks"));

  const modalButton1 = modal.querySelector('[data-js="modal-button-1"]');
  modalButton1.addEventListener("click", handleFirst);
  const modalButton2 = modal.querySelector('[data-js="modal-button-2"]');
  modalButton2.addEventListener("click", handleSecond);

  const thirdButton = modal.querySelector('[data-js="third-button"');
  thirdButton.addEventListener("click", handleThird);

  !button2 && modalButton2.classList.add("button--passive");
  !button3 && thirdButton.classList.add("button--passive");

  function getStyled() {
    const class2 = style2 || style1;
    const class3 = style3 || style2 || style1;
    modalButton1.classList.add(style1);
    modalButton2.classList.add(class2);
    thirdButton.classList.add(class3);
  }

  getStyled();

  function handleFirst() {
    firstFunction && firstFunction();
    modal.remove();
  }

  function handleSecond() {
    secondFunction && secondFunction(id);
    modal.remove();
  }

  function handleYes() {
    switch (mode) {
      // case "resetTime":
      //   timeReset();
      //   modal.remove();
      //   break;
      // case "reset":
      //   formReset();
      //   break;
      // case "afterSave":
      //   modal.remove();
      //   break;
      // case "delete":
      //   deleteEntry(id);
      //   break;
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
      case "edit":
        handleSubmit();
        modal.remove();
        const app = document.getElementById("app");
        app.append(Modal("afterEdit"));
        break;
      case "afterEdit":
        modal.remove();
        switchToNewTask();
        break;
    }
  }

  function handleSubmit() {
    const editForm = document.getElementById("edit-form");
    const formData = new FormData(editForm);
    const data = Object.fromEntries(formData);

    const currentDate = new Date();

    //needs converting from timespent to tmespan(ms) but not striytly necessary now
    const changedEntry = {
      ...entryToEdit,
      project: data.project,
      task: data.task,
      category: data.category,
      note: data.note,
      changeDate: currentDate,
      timeSpent: data.timeSpent,
    };
    const editedTasks = userEntries.map((entry) =>
      entry.id === id ? changedEntry : entry
    );
    localStorage.setItem("RecordedTasks", JSON.stringify(editedTasks));
    const edit = document.getElementById("edit-container");
    edit.remove();
  }

  function handleThird() {
    if (mode === "chooseBackup") {
      const userEntries = JSON.parse(localStorage.getItem("AutomaticBackup"));
      saveToLocalStorage(userEntries, "RecordedTasks");
      const timeRecords = document.getElementById("time-records");
      timeRecords.replaceWith(TimeRecords(userEntries));
    } else {
      switchToDone();
    }
    modal.remove();
  }

  function switchToDone() {
    removeAndHideEverything();
    deActivate();
    const app = document.getElementById("app");
    const userEntries = JSON.parse(localStorage.getItem("RecordedTasks"));
    app.append(ListContainer(userEntries));
    const doneTasksButton = document.querySelector(
      '[data-js="done-tasks-button"]'
    );
    doneTasksButton.classList.add("menu_button--active");
  }

  function switchToNewTask() {
    removeAndHideEverything();
    deActivate();
    const newTask = document.getElementById("form-container");
    newTask.classList.replace("form_container--noDisplay", "form_container");
    const newTaskButton = document.querySelector('[data-js="new-task-button"]');
    newTaskButton.classList.add("menu_button--active");
  }

  // function switchToAnalysis() {
  //   removeAndHideEverything();
  //   deActivate();
  //   const app = document.getElementById("app");
  //   const analysisButton = document.querySelector(
  //     '[data-js="analysis-button"]'
  //   );
  //   analysisButton.classList.add("menu_button--active");
  //   const myUserEntries =
  //     JSON.parse(localStorage.getItem("RecordedTasks")) || [];
  //   app.append(Analysis(myUserEntries));
  // }

  // function deleteEntry(id) {
  //   const updatedEntries = userEntries.filter((entry) => entry.id != id);
  //   const entryToDelete = document.getElementById(`${id}`);
  //   entryToDelete.remove();
  //   localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
  //   modal.remove();
  //   const listContainer = document.getElementById("list-container");
  //   updatedEntries.length === 0 &&
  //     listContainer.appendChild(Article(noTasksContent));
  // }

  function deleteAllEntries() {
    const updatedEntries = [];
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    modal.remove();
    const timeRecords = document.getElementById("time-records");
    timeRecords.replaceWith(Article(noTasksContent));
  }

  return modal;
}
