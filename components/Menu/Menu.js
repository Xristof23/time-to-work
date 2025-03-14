import {
  switchToAnalysis,
  switchToDone,
  switchToNewTask,
  switchToWhat,
} from "../../menuLogic.js";

export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button id="what-button" class="menu_button" data-js="what-button">What?</button>
    <button id="new-task-button" class="menu_button--active" data-js="new-task-button"> New </button>
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

  function handleClick(element) {
    element = element || window.event;
    const target = element.target || element.srcElement,
      text = target.id;

    switch (text) {
      case "what-button":
        switchToWhat();
        break;
      case "new-task-button":
        switchToNewTask();
        break;
      case "done-tasks-button":
        switchToDone();
        break;
      case "analysis-button":
        switchToAnalysis();
        break;
    }
  }

  return menu;
}
