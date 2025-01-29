import Article from "../Article/Article.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";
import Modal from "../Modal/Modal.js";
import { wantedDeleteAll } from "../../modalContent.js";
import { noTasksContent } from "../../textContent.js";
import {
  generateRandomInteger,
  properTimeFormatter,
  dateOptions,
  timeOptions,
} from "../../utils.js";
import { coder } from "../../demoData.js";

const daysBack = 2;

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
  demoButton.addEventListener("click", () => handleDemoMode(daysBack));

  function generateFakeDay(unixTime) {
    const workingHours = generateRandomInteger(8, 4);
    // const numberOfTasks = workingHours + generateRandomInteger(2, -2);
    const timeForTasks = Math.round(workingHours * 0.875 * 3600 * 1000);
    const tasksOfTheDay = [];

    let timeTotal = 0;
    function addTo(a) {
      const result = timeTotal + a;
      return result;
    }

    while (timeTotal < timeForTasks - 180000) {
      const timespan = generateRandomInteger(
        timeForTasks / 4,
        timeForTasks / 9
      );
      const timeSpent = properTimeFormatter(timespan);
      const startValue = unixTime - timeTotal;

      const startDate = new Date(startValue);
      const date = startDate.toLocaleDateString("en-EN", dateOptions);
      const time = startDate.toLocaleTimeString("en-EN", timeOptions);

      timeTotal = addTo(timespan);
      const randomNr = generateRandomInteger(6);
      const taskName = `${coder.tasks[randomNr]} ${generateRandomInteger(99)}`;
      const taskData = {
        startValue,
        date,
        taskName,
        time,
        timespan,
        timeSpent,
      };
      tasksOfTheDay.push(taskData);
    }

    // const allTasksOfDay = tasksOfTheDay.map((item, index) => {
    //   const updatedTaskData = { ...item, taskName };
    //   return updatedTaskData;
    // });
    // //need following line?
    // const numberOfTasks = tasksOfTheDay.length;

    console.log("tasks of the day: ", tasksOfTheDay);
    return tasksOfTheDay;
  }

  function handleDemoMode(days) {
    const currentUnixTime = Date.now();

    function fakeID(unixtime) {}

    const daysArray = [];
    for (let i = 1; i <= days; i++) {
      const thenUnixTime = currentUnixTime - (days - i) * 24 * 3600 * 1000;
      const thenDate = new Date(thenUnixTime);
      const date = thenDate.toLocaleDateString("en-EN", dateOptions);
      const dayData = { Nr: i, thenUnixTime, date };
      daysArray.unshift(dayData);
    }
    // console.log("daysArray", daysArray);
    const demoData = daysArray.map((element) => {
      const daysTasks = generateFakeDay(element.thenUnixTime);
      const newObject = { ...element, ...daysTasks };
      return newObject;
    });
    // console.log("demoData", demoData);
    return demoData;
  }

  function handleDeleteAll() {
    listContainer.append(Modal(wantedDeleteAll));
  }

  return listContainer;
}
