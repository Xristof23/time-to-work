import Modal from "../Modal/Modal.js";
import { noTasksContent } from "../../textContent.js";
import { properTimeFormatter } from "../../utils.js";

let all = true;

// let filteredEntries = [];

export default function Analysis(userEntries) {
  // here will be filter functions
  console.log(userEntries);
  const accumulatedTime = getSummedTimespan(userEntries);
  const analysis = document.createElement("section");
  analysis.classList.add("analysis");
  analysis.setAttribute("id", "analysis");

  analysis.innerHTML = /*html*/ `
    <h2>Analysis</h2>
    <div>
    Filter:
      <button type="button" data-js="all">
      All
      </button>
      <button type="button" data-js="today">
       Today
      </button>
           <button type="button" data-js="yesterday">
       Yesterday
      </button>
      </div>
       <div class="analysed_container"> 
       <p>Number of Tasks: <output data-js="number-of-tasks">${
         userEntries.length
       } </output><p>
      <p>Accumulated Time: <output data-js="time-sum" >${properTimeFormatter(
        accumulatedTime
      )}</output></p>
      <p>Average Time:  <output data-js="time-average">${getAverageTimespan(
        userEntries
      )}</output></p>
      </div>
`;

  function filterEntriesByDate(array, left, right) {
    const filteredEntries = array.filter(
      (entry) => entry.startValue >= left && entry.startValue <= right
    );
    return filteredEntries;
  }

  function updateAnalysis(datestring) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let left = 0;
    let right = Date.now();
    switch (datestring) {
      case "all":
        left = 0;
        break;
      case "today":
        left = today.valueOf();
        break;
      case "yesterday":
        left = today.valueOf() - 24 * 3600 * 1000;
        right = today.valueOf();
        break;
    }

    const filteredEntries = filterEntriesByDate(userEntries, left, right);
    console.log(filteredEntries);
    const updatedNumberOfTasks = filteredEntries.length;
    const updatedTimeSum = getSummedTimespan(filteredEntries);
    const numberOfTasksOutput = analysis.querySelector(
      '[data-js="number-of-tasks"]'
    );

    numberOfTasksOutput.textContent = updatedNumberOfTasks;
    const timeSumOutput = analysis.querySelector('[data-js="time-sum"]');
    timeSumOutput.textContent = properTimeFormatter(updatedTimeSum);
    const averageTimeOutput = analysis.querySelector(
      '[data-js="time-average"]'
    );
    averageTimeOutput.textContent = getAverageTimespan(filteredEntries);
  }

  function getAverageTimespan(entries) {
    const average = getSummedTimespan(entries) / entries.length;
    const formattedAverage =
      entries.length > 0
        ? properTimeFormatter(average)
        : "No tasks to compute in this timespan.";
    return formattedAverage;
  }

  function getSummedTimespan(entries) {
    let sum = 0;
    entries.forEach((element) => {
      sum = sum + element.timespan;
    });
    return sum;
  }

  const allButton = analysis.querySelector('[data-js="all"]');
  allButton.addEventListener("click", () => updateAnalysis("all"));

  const todayButton = analysis.querySelector('[data-js="today"]');
  todayButton.addEventListener("click", () => updateAnalysis("today"));

  const yesterdayButton = analysis.querySelector('[data-js="yesterday"]');
  yesterdayButton.addEventListener("click", () => updateAnalysis("yesterday"));

  function handleAll() {
    all = true;
    console.log("all");
    updateAnalysis();
  }

  return analysis;
}
