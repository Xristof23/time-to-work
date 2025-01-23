import ListEntry from "../ListEntry/ListEntry.js";

// const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

export default function TimeRecords(userEntries) {
  const timeRecords = document.createElement("section");
  timeRecords.classList.add("time-records");
  timeRecords.setAttribute("id", "time-records");
  userEntries.forEach((element) => {
    const listElement = ListEntry(element);
    timeRecords.append(listElement);
  });

  return timeRecords;
}
