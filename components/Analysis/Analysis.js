import Modal from "../Modal/Modal.js";
import { properTimeFormatter, removeDuplicates } from "../../utils.js";

const filterRules = {};

export default function Analysis(userEntries) {
  // here will be filter functions
  console.log("userEntries:  ", userEntries);
  const accumulatedTime = getSummedTimespan(userEntries);
  const analysis = document.createElement("section");
  analysis.classList.add("analysis");
  analysis.setAttribute("id", "analysis");

  analysis.innerHTML = /*html*/ `
    <h2>Analysis</h2>
    <div class="button_container">
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
      <button type="button" data-js="test-options">
       test options
      </button>
      </div>
      <label class="label_standard" for="project-select">Choose a project:</label>
        <select class="select_standard" name="project-select" id="project-select" data-js="project-select">
     <option>project</option>
        </select>
       
       <div class="analysed_container"> 
        <p class="analysis_part" >Number of Tasks: 
            <output data-js="number-of-tasks">${userEntries.length} </output>
        <p class="analysis_part" >Accumulated Time:
        	<output data-js="time-sum" >${properTimeFormatter(
            accumulatedTime
          )}</output>
        </p>
        <p class="analysis_part" >Average Time:
        <output data-js="time-average">${getAverageTimespan(
          userEntries
        )}</output></p>
      </div>
`;

  const allButton = analysis.querySelector('[data-js="all"]');
  allButton.addEventListener("click", () => filterAndUpdate("all"));

  const todayButton = analysis.querySelector('[data-js="today"]');
  todayButton.addEventListener("click", () => filterAndUpdate("today"));

  const yesterdayButton = analysis.querySelector('[data-js="yesterday"]');
  yesterdayButton.addEventListener("click", () => filterAndUpdate("yesterday"));

  const testButton = analysis.querySelector('[data-js="test-options"]');
  testButton.addEventListener("click", populateOptions);

  // let res = document.getElementById('GFG');

  // options select logic
  function populateOptions() {
    const projectSelect = analysis.querySelector('[data-js="project-select"]');
    const projects = getOptionsFromEntries(userEntries, "project");
    projects.forEach((project) => {
      //   const option = project;
      const element = document.createElement("option");
      element.textContent = project;
      element.value = project;
      projectSelect.appendChild(element);
    });
  }
  populateOptions();

  function updateCategories(entries) {
    const categoriesRaw = removeDuplicates(
      entries.map((entry) => entry.category)
    );
    const categories = categoriesRaw.map((cat) => {
      const newCategory = cat === "" ? "no category assigned" : cat;
      return newCategory;
    });
    return categories;
  }

  function getOptionsFromEntries(array, chosenKey) {
    const optionsRaw = removeDuplicates(array.map((entry) => entry[chosenKey]));
    const options =
      chosenKey === "category"
        ? optionsRaw.map((cat) => {
            const newCategory = cat === "" ? "no category assigned" : cat;
            return newCategory;
          })
        : optionsRaw;
    return options;
  }

  //   console.log("categories: ", getOptionsFromEntries(userEntries, "category"));

  console.log("tasks: ", getOptionsFromEntries(userEntries, "task"));

  function filterEntriesBy(array, chosenKey, criterium) {
    const filteredEntries = array.filter(
      (entry) => entry[chosenKey] === criterium
    );
    return filteredEntries;
  }

  function filterEntriesByDate(array, left, right) {
    const filteredEntries = array.filter(
      (entry) => entry.startValue >= left && entry.startValue <= right
    );
    return filteredEntries;
  }

  function filterAndUpdate(datestring) {
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

  return analysis;
}
