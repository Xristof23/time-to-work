import What from "../What/What.js";
import { whatContent } from "../../textContent.js";
import ListContainer from "../ListContainer/ListContainer.js";
import Analysis from "../Analysis/Analysis.js";
import FormContainer from "../FormContainer/FormContainer.js";

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

  function handleClick(element) {
    element = element || window.event;
    const target = element.target || element.srcElement,
      text = target.id;
    const app = document.getElementById("app");
    const what = document.getElementById("what");
    const newTask = document.getElementById("form-container");
    const listContainer = document.getElementById("list-container");
    const analysis = document.getElementById("analysis");

    switch (text) {
      case "what-button":
        analysis && analysisButton.classList.toggle("menu_button--active");
        analysis && analysis.remove();
        newTask && newTaskButton.classList.toggle("menu_button--active");
        newTask && newTask.remove();
        listContainer &&
          doneTasksButton.classList.toggle("menu_button--active");
        listContainer && listContainer.remove();
        !what && whatButton.classList.toggle("menu_button--active");
        !what && app.append(What(whatContent));
        break;
      case "new-task-button":
        analysis && analysisButton.classList.toggle("menu_button--active");
        analysis && analysis.remove();
        what && whatButton.classList.toggle("menu_button--active");
        what && what.remove();
        listContainer &&
          doneTasksButton.classList.toggle("menu_button--active");
        listContainer && listContainer.remove();
        !newTask && newTaskButton.classList.toggle("menu_button--active");
        !newTask && app.append(FormContainer());
        break;
      case "done-tasks-button":
        analysis && analysisButton.classList.toggle("menu_button--active");
        analysis && analysis.remove();
        what && whatButton.classList.toggle("menu_button--active");
        what && what.remove();
        newTask && newTaskButton.classList.toggle("menu_button--active");
        newTask && newTask.remove();
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
        what && whatButton.classList.toggle("menu_button--active");
        what && what.remove();
        newTask && newTaskButton.classList.toggle("menu_button--active");
        newTask && newTask.remove();
        listContainer &&
          doneTasksButton.classList.toggle("menu_button--active");
        listContainer && listContainer.remove();
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
