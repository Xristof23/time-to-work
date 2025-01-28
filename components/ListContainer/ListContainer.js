import Article from "../Article/Article.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";
import Modal from "../Modal/Modal.js";
import { wantedDeleteAll } from "../../modalContent.js";
import { noTasksContent } from "../../textContent.js";
import { generateRandomInteger, properTimeFormatter } from "../../utils.js";

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");

  listContainer.innerHTML = /*html*/ `
    <h2>Done tasks</h2>
        <button type="button" class="demo_button" data-js="demo-button">
   demo
    </button>
        <button type="button" class="backup_button" data-js="backup-button">
   backup
    </button>
    <button type="button" class="delete-all_button"  data-js="delete-all-button">
   delete all
    </button>

`;
  userEntries.length > 0
    ? listContainer.append(TimeRecords(userEntries))
    : listContainer.appendChild(Article(noTasksContent));

  const deleteAllButton = listContainer.querySelector(
    '[data-js="delete-all-button"]'
  );
  deleteAllButton.addEventListener("click", handleDeleteAll);

  const backupButton = listContainer.querySelector('[data-js="backup-button"]');
  backupButton.addEventListener("click", handleBackup);

  function handleBackup() {
    localStorage.setItem("TasksBackup", JSON.stringify(userEntries));
  }

  const demoButton = listContainer.querySelector('[data-js="demo-button"]');
  demoButton.addEventListener("click", divideRandomly);

  function divideRandomly() {
    let timeTotal = 0;
    function addTo(a) {
      const result = timeTotal + a;
      return result;
    }
    const testNumber = 1000;

    while (timeTotal < testNumber - 100) {
      const timeforTask = generateRandomInteger(testNumber / 4, 100);
      timeTotal = addTo(timeforTask);
      console.log("timefortask: ", timeforTask);
      console.log("timeTotal: ", timeTotal);
    }
  }

  function generateFakeDay() {
    const workingHours = generateRandomInteger(8, 4);
    const numberOfTasks = workingHours + generateRandomInteger(2, -2);
    const timeForTasks = Math.round(workingHours * 0.875 * 3600 * 1000);
    let timeForChange = timeForTasks;
    const tasksOfTheDay = [];

    //infinite loop?

    // while (timeForChange > 0) {
    //   const timespan = generateRandomInteger(5400000, 180000);
    //   // const timeSpent = properTimeFormatter(timespan);
    //   timeForChange = timeForTasks - timespan;
    //   console.log(timespan);
    //   // const task = "task " + i;
    //   // const taskData = { i, task, timespan, timeSpent };
    //   // tasksOfTheDay.unshift(taskData);
    // }
    // console.log("test", generateRandomInteger(1000));

    for (let i = 1; i <= numberOfTasks; i++) {
      const task = "task " + i;
      const timeSpan = generateRandomInteger(5400000, 180000);
      const taskData = { i, task, timeSpan };
      tasksOfTheDay.unshift(taskData);
    }

    // console.log(tasksOfTheDay);
    return tasksOfTheDay;
  }

  function handleDemoMode(days) {
    const currentUnixTime = Date.now();

    function fakeID(unixtime) {}

    const daysArray = [];
    for (let i = 1; i < days; i++) {
      const thenUnixTime = currentUnixTime - (days - i) * 24 * 3600 * 1000;
      const date = new Date(thenUnixTime);
      const dayData = { i, date };
      daysArray.unshift(dayData);
    }
    return daysArray;
  }

  // console.log(handleDemoMode(10));

  function handleDeleteAll() {
    listContainer.append(Modal(wantedDeleteAll));
  }

  return listContainer;
}
