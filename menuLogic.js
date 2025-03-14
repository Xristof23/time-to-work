import Analysis from "../components/Analysis/Analysis.js";
import ListContainer from "../components/ListContainer/ListContainer.js";

import What from "./components/What/What.js";
import { whatContent } from "./textContent.js";

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
  !newTask.classList.contains("form_container--noDisplay") &&
    newTask.classList.add("form_container--noDisplay");
}

function deActivate() {
  const testElements = document.getElementsByClassName("menu_button--active");
  const testButtons = Array.prototype.filter.call(
    testElements,
    (testElement) => testElement.nodeName === "BUTTON"
  );
  const testButton = testButtons[0];
  testButton.classList.toggle("menu_button--active");
}

function switchToWhat() {
  removeAndHideEverything();
  deActivate();
  const app = document.getElementById("app");
  const whatButton = document.querySelector('[data-js="what-button"]');
  whatButton.classList.add("menu_button--active");
  app.append(What(whatContent));
}

function switchToAnalysis() {
  removeAndHideEverything();
  deActivate();
  const app = document.getElementById("app");
  const analysis = document.getElementById("analysis");
  const analysisButton = document.querySelector('[data-js="analysis-button"]');
  analysisButton.classList.add("menu_button--active");
  const myUserEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];
  app.append(Analysis(myUserEntries));
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

export {
  removeAndHideEverything,
  deActivate,
  switchToAnalysis,
  switchToWhat,
  switchToDone,
  switchToNewTask,
};
