import What from "../What/What.js";
import ListContainer from "../ListContainer/ListContainer.js";
import { whatContent } from "../../textContent.js";
import FormContainer from "../FormContainer/FormContainer.js";

export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button id="what-button" class="menu_button" data-js="what-button">what?</button>
    <button id="new-task-button" class="menu_button--active" data-js="new-task-button">new task</button>
    <button id="done-tasks-button" class="menu_button" data-js="done-tasks-button">done tasks</button>
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
    const app = document.getElementById("app");
    const what = document.getElementById("what");
    const newTask = document.getElementById("main-form");
    const listContainer = document.getElementById("list-container");

    switch (text) {
      case "what-button":
        newTask && newTaskButton.classList.toggle("menu_button--active");
        newTask && newTask.remove();
        listContainer &&
          doneTasksButton.classList.toggle("menu_button--active");
        listContainer && listContainer.remove();
        !what && whatButton.classList.toggle("menu_button--active");
        !what && app.append(What(whatContent));
        break;
      case "new-task-button":
        what && whatButton.classList.toggle("menu_button--active");
        what && what.remove();
        listContainer &&
          doneTasksButton.classList.toggle("menu_button--active");
        listContainer && listContainer.remove();
        !newTask && newTaskButton.classList.toggle("menu_button--active");
        !newTask && app.append(FormContainer());
        break;
      case "done-tasks-button":
        what && whatButton.classList.toggle("menu_button--active");
        what && what.remove();
        newTask && newTaskButton.classList.toggle("menu_button--active");
        newTask && newTask.remove();
        const userEntries =
          JSON.parse(localStorage.getItem("RecordedTasks")) || [];
        if (listContainer) {
          null;
        } else {
          doneTasksButton.classList.toggle("menu_button--active");
          app.append(ListContainer(userEntries));
        }
        break;
    }
  }

  return menu;
}
