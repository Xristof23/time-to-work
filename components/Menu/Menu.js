import What from "../What/What.js";
import ListContainer from "../ListContainer/ListContainer.js";
import MainTiming from "../MainTiming/MainTiming.js";

let whatButtonCounter = 0;
let newTaskButtonCounter = 0;
let doneTasksButtonCounter = 0;

export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button id="what-button" data-js="what-button">what?</button>
    <button id="new-task-button" data-js="new-task-button">new task</button>
    <button id="done-tasks-button" data-js="done-tasks-button">done tasks</button>
`;
  const whatButton = menu.querySelector('[data-js="what-button"]');
  const newTaskButton = menu.querySelector('[data-js="new-task-button"]');
  const doneTasksButton = menu.querySelector('[data-js="done-tasks-button"]');

  whatButton.addEventListener("click", handleClick, false);
  newTaskButton.addEventListener("click", handleClick, false);
  doneTasksButton.addEventListener("click", handleClick, false);

  function handleClick(e) {
    e = e || window.event;
    const target = e.target || e.srcElement,
      // text = target.textContent || target.innerText;
      text = target.id;
    console.log("clicked ", text);
    const app = document.getElementById("app");
    const what = document.getElementById("what");
    const newTask = document.getElementById("main-form");
    const listContainer = document.getElementById("list-container");

    switch (text) {
      case "what-button":
        whatButtonCounter % 2 === 0 ? app.append(What()) : what.remove();
        ++whatButtonCounter;
        break;
      case "new-task-button":
        what && what.remove();
        newTaskButtonCounter % 2 === 0
          ? app.append(MainTiming())
          : newTask.remove();
        ++newTaskButtonCounter;
        break;
      case "done-tasks-button":
        what && what.remove();
        doneTasksButtonCounter % 2 === 0
          ? app.append(ListContainer())
          : listContainer.remove();
        ++doneTasksButtonCounter;
        break;
    }
  }

  function handleEntries() {
    const app = document.getElementById("app");
    const listContainer = document.getElementById("list-container");
    entriesButtonCounter % 2 === 0
      ? app.append(ListContainer())
      : listContainer.remove();
    ++entriesButtonCounter;
  }

  return menu;
}
