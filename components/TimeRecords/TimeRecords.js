const userData = JSON.parse(localStorage.getItem("RecordedTasks"));
console.log("userdata from Timerecords", userData);

export default function TimeRecords() {
  const timeRecords = document.createElement("section");
  timeRecords.innerHTML = /*html*/ `
  <h2>My Tasks</h2>`;
  return timeRecords;
}
