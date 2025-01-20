import ListEntry from "../ListEntry/ListEntry.js";

const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [
  {
    id: "test123",
    project: "Example project",
    task: "Something to do",
    date: "today",
    time: "12:00",
    timeSpent: "6 min",
  },
];

export default function TimeRecords() {
  const timeRecords = document.createElement("section");
  timeRecords.classList.add("time-records");

  userEntries.forEach((element) => {
    const listElement = ListEntry(element);
    timeRecords.append(listElement);
  });

  return timeRecords;
}
