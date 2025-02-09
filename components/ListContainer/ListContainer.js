import Article from "../Article/Article.js";
import TimeRecords from "../TimeRecords/TimeRecords.js";
import Modal from "../Modal/Modal.js";
import { noTasksContent } from "../../textContent.js";
import {
  generateRandomInteger,
  properTimeFormatter,
  dateOptions,
  timeOptions,
  createUnixTimeID,
  saveToLocalStorage,
} from "../../utils.js";
import { coder } from "../../demoData.js";

const daysBack = 2;

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");

  listContainer.innerHTML = /*html*/ `
    <h2>Done tasks</h2>
    <div>
      <button type="button"  data-js="demo-button">
        demo-mode
      </button>
      <button type="button" data-js="backup-button">
        backup
      </button>
      <button type="button" data-js="load-backup-button">
        load backup
      </button>
      </div>
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

  const demoButton = listContainer.querySelector('[data-js="demo-button"]');
  demoButton.addEventListener("click", () => handleDemoMode(daysBack));

  const loadButton = listContainer.querySelector(
    '[data-js="load-backup-button"]'
  );
  loadButton.addEventListener("click", handleLoadBackup);

  function handleBackup() {
    saveToLocalStorage(userEntries);
    listContainer.append(Modal("madeBackup"));
  }

  function handleLoadBackup() {
    listContainer.append(Modal("chooseBackup"));
  }

  //evtl auslagern ...

  function generateFakeDay(unixTime) {
    const workingHours = generateRandomInteger(9, 4);
    const timeForTasks = Math.round(workingHours * 0.875 * 3600 * 1000);
    const tasksOfTheDay = [];

    let timeTotal = 0;

    function addTo(a) {
      const result = timeTotal + a;
      return result;
    }

    while (timeTotal < timeForTasks) {
      const timespan = generateRandomInteger(
        timeForTasks / 4,
        timeForTasks / 9
      );
      const timeSpent = properTimeFormatter(timespan);
      const startValue = unixTime + timeTotal;

      const startDate = new Date(startValue);
      const date = startDate.toLocaleDateString("en-EN", dateOptions);
      const time = startDate.toLocaleTimeString("en-EN", timeOptions);

      timeTotal = addTo(timespan);

      const task = `${coder.tasks[generateRandomInteger(12)]}`;
      const project = `${
        coder.project[generateRandomInteger(6)]
      } v0.0${generateRandomInteger(49)}`;
      const category = coder.category;
      const taskData = {
        id: createUnixTimeID(startValue),
        startValue,
        date,
        task,
        project,
        category,
        time,
        timespan,
        timeSpent,
      };
      tasksOfTheDay.unshift(taskData);
    }

    return tasksOfTheDay;
  }

  function handleDemoMode(days) {
    const currentUnixTime = Date.now();
    const fakeDate = new Date(currentUnixTime);
    fakeDate.setHours(
      generateRandomInteger(9, 7),
      generateRandomInteger(59, 0),
      generateRandomInteger(59, 0)
    );
    const correctedUnixTime = fakeDate.valueOf();
    saveToLocalStorage(userEntries, "AutomaticBackup");

    const daysArray = [];
    for (let i = 1; i <= days; i++) {
      const thenUnixTime = correctedUnixTime - (days - i) * 24 * 3600 * 1000;
      const thenDate = new Date(thenUnixTime);
      const date = thenDate.toLocaleDateString("en-EN", dateOptions);
      const dayData = { Nr: i, thenUnixTime, date };
      daysArray.unshift(dayData);
    }

    const demoData = daysArray.flatMap((element) => {
      const daysTasks = generateFakeDay(element.thenUnixTime);
      const tasksArray = [...daysTasks];
      return tasksArray;
    });

    const timeRecords = document.getElementById("time-records");
    const articleToRemove = document.getElementById("noTasks");
    timeRecords
      ? timeRecords.replaceWith(TimeRecords(demoData))
      : articleToRemove.replaceWith(TimeRecords(demoData));
    saveToLocalStorage(demoData, "RecordedTasks");
  }

  function handleDeleteAll() {
    listContainer.append(Modal("deleteAll"));
  }

  return listContainer;
}
