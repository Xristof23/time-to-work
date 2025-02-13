import { properTimeFormatter, removeDuplicates } from "../../utils.js";

let dateFilter = "all";

export default function Analysis(userEntries) {
  let filteredEntries = userEntries;
  const accumulatedTime = getSummedTimespan(userEntries);
  const analysis = document.createElement("section");
  analysis.classList.add("analysis");
  analysis.setAttribute("id", "analysis");

  analysis.innerHTML = /*html*/ `
    <h2>Analysis</h2>
    <div class="button_container">
    Date:
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

    <label class="label_standard" for="category-select">Filter by:</label>
        <select class="select_standard" name="category-select" id="category-select" data-js="category-select">
            <option>category</option>
        </select>
    <br />
    <label class="label_standard" for="project-select">Filter by:</label>
        <select class="select_standard" name="project-select" id="project-select" data-js="project-select">
            <option>project</option>
        </select>
    <br />
    <label class="label_standard" for="task-select">Filter by:</label>
        <select class="select_standard" name="task-select" id="task-select" data-js="task-select">
            <option>task</option>
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

  const categorySelect = analysis.querySelector('[data-js="category-select"]');
  categorySelect.addEventListener("change", getCriteriumAndUpdate);

  const projectSelect = analysis.querySelector('[data-js="project-select"]');
  projectSelect.addEventListener("change", getCriteriumAndUpdate);

  const taskSelect = analysis.querySelector('[data-js="task-select"]');
  taskSelect.addEventListener("change", getCriteriumAndUpdate);

  const allButton = analysis.querySelector('[data-js="all"]');
  allButton.addEventListener("click", () => {
    dateFilter != "all" && allButton.classList.toggle("button--active");
    dateFilter === "today" && todayButton.classList.toggle("button--active");
    dateFilter === "yesterday" &&
      yesterdayButton.classList.toggle("button--active");
    dateFilter = "all";
    filterAndUpdate("all");
  });

  const todayButton = analysis.querySelector('[data-js="today"]');
  todayButton.addEventListener("click", () => {
    dateFilter != "today" && todayButton.classList.toggle("button--active");
    dateFilter === "all" && allButton.classList.toggle("button--active");
    dateFilter === "yesterday" &&
      yesterdayButton.classList.toggle("button--active");
    dateFilter = "today";
    filterAndUpdate("today");
  });

  const yesterdayButton = analysis.querySelector('[data-js="yesterday"]');
  yesterdayButton.addEventListener("click", () => {
    dateFilter != "yesterday" &&
      yesterdayButton.classList.toggle("button--active");
    dateFilter === "all" && allButton.classList.toggle("button--active");
    dateFilter === "today" && todayButton.classList.toggle("button--active");
    dateFilter = "yesterday";
    filterAndUpdate("yesterday");
  });

  // helper (move out later) does not work
  function getIdfromClick(element) {
    element = element || window.event;
    const target = element.target || element.srcElement,
      text = target.id;
    console.log("idText: ", text);
    return text;
  }

  function getStarted() {
    const allButton = analysis.querySelector('[data-js="all"]');
    allButton.classList.toggle("button--active");
    dateFilter = "all";
  }
  getStarted();
  // options prep
  function populateOptions() {
    const categorySelect = analysis.querySelector(
      '[data-js="category-select"]'
    );
    const categories = getOptionsFromEntries(userEntries, "category");
    categories.forEach((category) => {
      const element = document.createElement("option");
      element.textContent = category;
      element.value = category;
      categorySelect.appendChild(element);
    });

    const taskSelect = analysis.querySelector('[data-js="task-select"]');
    const tasks = getOptionsFromEntries(userEntries, "task");
    tasks.forEach((task) => {
      const element = document.createElement("option");
      element.textContent = task;
      element.value = task;
      taskSelect.appendChild(element);
    });
    const projectSelect = analysis.querySelector('[data-js="project-select"]');
    const projects = getOptionsFromEntries(userEntries, "project");
    projects.forEach((project) => {
      const element = document.createElement("option");
      element.textContent = project;
      element.value = project;
      projectSelect.appendChild(element);
    });
  }
  populateOptions();

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

  //filters
  function getCriteriumAndUpdate(element) {
    element = element || window.event;
    const target = element.target || element.srcElement,
      text = target.id;
    const chosenkey = text.slice(0, -7);
    const criterium =
      chosenkey === "task"
        ? taskSelect.value
        : chosenkey === "project"
        ? projectSelect.value
        : categorySelect.value;
    filteredEntries = filterEntriesBy(filteredEntries, chosenkey, criterium);
    updateAnalysis();
  }

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

  function filterAndUpdate(dateString, criterium) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let left = 0;
    let right = Date.now();

    switch (dateString) {
      case false:
        left = 0;
        console.log("dateString: ", dateString);
        break;
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
    filteredEntries = filterEntriesByDate(userEntries, left, right);

    updateAnalysis();
  }

  function updateAnalysis() {
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

  //Analysis functions
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
