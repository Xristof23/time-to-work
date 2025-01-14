import Headline2 from "../Headline2/Headline2.js";
import ListEntry from "../ListEntry/ListEntry.js";

const userEntries = JSON.parse(localStorage.getItem("RecordedTasks"));

export default function TimeRecords() {
  const timeRecords = document.createElement("section");
  timeRecords.append(Headline2("My tasks"));

  userEntries.forEach((element) => {
    const listElement = ListEntry(element);
    timeRecords.append(listElement);
  });

  return timeRecords;
}