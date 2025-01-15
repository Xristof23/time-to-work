import ListEntry from "../ListEntry/ListEntry.js";

const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

export default function TimeRecords() {
  const timeRecords = document.createElement("section");
  timeRecords.classList.add("time-records");

  userEntries.forEach((element) => {
    const listElement = ListEntry(element);
    timeRecords.append(listElement);
  });

  return timeRecords;
}
