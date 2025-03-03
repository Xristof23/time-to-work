import What from "../What/What.js";
import { whatContent } from "../../textContent.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Analysis from "../Analysis/Analysis.js";

export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button id="what-button" class="menu_button" data-js="what-button">What?</button>
    <button id="new-task-button" class="menu_button--active" data-js="new-task-button">New</button>
    <button id="done-tasks-button" class="menu_button" data-js="done-tasks-button">Done</button>
     <button id="analysis-button" class="menu_button" data-js="analysis-button">Analysis</button>
`;
  const whatButton = menu.querySelector('[data-js="what-button"]');
  const newTaskButton = menu.querySelector('[data-js="new-task-button"]');
  const doneTasksButton = menu.querySelector('[data-js="done-tasks-button"]');
  const analysisButton = menu.querySelector('[data-js="analysis-button"]');

  whatButton.addEventListener("click", handleClick, false);
  newTaskButton.addEventListener("click", handleClick, false);
  doneTasksButton.addEventListener("click", handleClick, false);
  analysisButton.addEventListener("click", handleClick, false);

  const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

  function removeAndHideEverything() {
    const what = document.getElementById("what");
    const newTask = document.getElementById("form-container");
    const edit = document.getElementById("edit-container");
    const listContainer = document.getElementById("list-container");
    const analysis = document.getElementById("analysis");
    analysis && analysis.remove();
    listContainer && listContainer.remove();
    what && what.remove();
    edit && edit.remove();
    newTask.classList.add("form_container--noDisplay");
  }

  function deActivate() {
    const testElements = menu.getElementsByClassName("menu_button--active");
    const testButtons = Array.prototype.filter.call(
      testElements,
      (testElement) => testElement.nodeName === "BUTTON"
    );
    const testButton = testButtons[0];
    testButton.classList.toggle("menu_button--active");
  }

  function handleClick(element) {
    element = element || window.event;
    const target = element.target || element.srcElement,
      text = target.id;
    const app = document.getElementById("app");
    const what = document.getElementById("what");
    const newTask = document.getElementById("form-container");
    const listContainer = document.getElementById("list-container");
    const analysis = document.getElementById("analysis");
    removeAndHideEverything();
    deActivate();
    switch (text) {
      case "what-button":
        !what && whatButton.classList.toggle("menu_button--active");
        !what && app.append(What(whatContent));
        break;
      case "new-task-button":
        newTaskButton.classList.add("menu_button--active");
        newTask.classList.remove("form_container--noDisplay");
        break;
      case "done-tasks-button":
        const newUserEntries =
          JSON.parse(localStorage.getItem("RecordedTasks")) || [];
        if (listContainer && newUserEntries.length != userEntries.length) {
          remove.listContainer;
          app.append(ListContainer(newUserEntries));
        } else {
          doneTasksButton.classList.toggle("menu_button--active");
          app.append(ListContainer(newUserEntries));
        }
        break;
      case "analysis-button":
        !analysis && analysisButton.classList.toggle("menu_button--active");
        const myUserEntries =
          JSON.parse(localStorage.getItem("RecordedTasks")) || [];
        if (!analysis && myUserEntries.length != userEntries.length) {
        }
        app.append(Analysis(myUserEntries));
        break;
    }
  }

  return menu;
}
