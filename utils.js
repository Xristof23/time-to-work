import Modal from "./components/Modal/Modal.js";

//real utils
function removeDuplicates(array) {
  return [...new Set(array)];
}

function generateRandomInteger(max, min) {
  const minNumber = Number(min) || 0;
  const maxNumber = Number(max);
  const range = Math.abs(Math.round(maxNumber - minNumber));
  const withinRange = Math.round(Math.random() * range);
  const randomInteger = minNumber + withinRange;
  return randomInteger;
}

function saveToLocalStorage(data, name) {
  const backupName = name || "TasksBackup";
  localStorage.setItem(backupName, JSON.stringify(data));
}

//list utils (may move these)
function loadBackup() {
  const userEntries = JSON.parse(localStorage.getItem("TasksBackup"));
  const timeRecords = document.getElementById("time-records");
  timeRecords.replaceWith(timeRecords(userEntries));
  saveToLocalStorage(userEntries, "RecordedTasks");
}

function deleteEntry(id) {
  const recordedTasks = JSON.parse(localStorage.getItem("RecordedTasks"));
  const updatedEntries = recordedTasks.filter((entry) => entry.id != id);
  const entryToDelete = document.getElementById(`${id}`);
  entryToDelete.remove();
  localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
  const listContainer = document.getElementById("list-container");
  updatedEntries.length === 0 &&
    listContainer.appendChild(Article(noTasksContent));
}

function deleteAllEntries() {
  const updatedEntries = [];
  localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
  const modal = document.getElementById("modal1");
  modal.remove();
  const timeRecords = document.getElementById("time-records");
  timeRecords.replaceWith(Article(noTasksContent));
}

function handleEdit(editId) {
  const editForm = document.getElementById("edit-form");
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData);

  const currentDate = new Date();

  const recordedTasks = JSON.parse(localStorage.getItem("RecordedTasks"));
  const entryToEdit = recordedTasks.filter((entry) => entry.id === editId)[0];

  //needs converting from timespent to timespan(ms) but not strictly necessary now
  const changedEntry = {
    ...entryToEdit,
    project: data.project,
    task: data.task,
    category: data.category,
    note: data.note,
    changeDate: currentDate,
    timeSpent: data.timeSpent,
  };

  const editedTasks = recordedTasks.map((entry) =>
    entry.id === editId ? changedEntry : entry
  );

  localStorage.setItem("RecordedTasks", JSON.stringify(editedTasks));
  const edit = document.getElementById("edit-container");
  edit.remove();
  const app = document.getElementById("app");
  app.append(Modal("afterEdit"));
}

//rest (form)
function formReset() {
  const form = document.getElementById("main-form");
  form.reset();
}

function timeReset() {
  const startOutput = document.querySelector('[data-js="start-output"]');
  const endOutput = document.querySelector('[data-js="end-output"]');
  const timespanOutput = document.querySelector('[data-js="timespan-output"]');
  startOutput.textContent = "";
  endOutput.textContent = "";
  timespanOutput.textContent = "";
  timingProps = {};
  const sector1 = document.querySelector('[data-js="sector-1"]');
  sector1.classList.add("sector--passive");
}

function createUnixTimeID(unixTime) {
  const unixDate = unixTime || Date.now();
  const firstNumber = Math.round(unixDate / 1000);
  const firstPart = firstNumber.toString().slice(3);
  const randomNr = Math.floor(Math.random() * 1000);
  const secondPart = randomNr.toLocaleString("en-US", {
    minimumIntegerDigits: 3,
    useGrouping: false,
  });
  const newId = Number(firstPart + secondPart);
  return newId;
}

// date and time
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const timeOptions = {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

function properTimeFormatter(timeInMs, options) {
  const allSeconds = Math.round(timeInMs / 1000);
  const rawSeconds = Math.floor(allSeconds % 60);
  const seconds = rawSeconds.toLocaleString("en-US", {
    minimumIntegerDigits: allSeconds < 60 && rawSeconds < 10 ? 1 : 2,
    useGrouping: false,
  });

  const rawHours = allSeconds < 3600 ? 0 : Math.floor(allSeconds / 3600);
  const hours = rawHours.toLocaleString("en-US", {
    minimumIntegerDigits: rawHours < 10 ? 1 : 2,
    useGrouping: false,
  });

  const rawMinutes =
    allSeconds < 60 ? 0 : Math.floor((allSeconds - rawHours * 3600) / 60);
  const minutes = rawMinutes.toLocaleString("en-US", {
    minimumIntegerDigits: allSeconds < 3600 && rawMinutes < 10 ? 1 : 2,
    useGrouping: false,
  });

  const unit = allSeconds < 60 ? "sec" : allSeconds < 3600 ? "min" : "hours";
  const formattedTime =
    allSeconds < 60
      ? `${seconds} ${unit}`
      : allSeconds < 3600
      ? `${minutes}:${seconds} ${unit}`
      : `${hours}:${minutes}:${seconds} ${unit}`;
  return formattedTime;
}

export {
  createUnixTimeID,
  deleteEntry,
  deleteAllEntries,
  loadBackup,
  generateRandomInteger,
  removeDuplicates,
  saveToLocalStorage,
  formReset,
  handleEdit,
  timeReset,
  properTimeFormatter,
  dateOptions,
  timeOptions,
};
