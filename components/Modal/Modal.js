import {
  removeAndHideEverything,
  deActivate,
  switchToDone,
  switchToAnalysis,
  switchToNewTask,
} from "../../menuLogic.js";
import { modalContentList } from "../../modalContent.js";
import { saveToLocalStorage, timeReset } from "../../utils.js";
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
      // case "deleteAll":
      //   deleteAllEntries();
      //   break;
      // case "chooseBackup":
      //   const userEntries = JSON.parse(localStorage.getItem("TasksBackup"));
      //   const timeRecords = document.getElementById("time-records");
      //   timeRecords.replaceWith(TimeRecords(userEntries));
      //   saveToLocalStorage(userEntries, "RecordedTasks");
      //   modal.remove();
      //   break;
      case "edit":
        handleEdit();
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

  return modal;
}
