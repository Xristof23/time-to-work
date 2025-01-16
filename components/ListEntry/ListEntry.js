export default function ListEntry(element) {
  const listEntry = document.createElement("article");
  listEntry.classList.add("listEntry");
  listEntry.innerHTML = /* html */ `
  <p class="detail_paragraph">Project: ${element.project} </p>
  <p class="detail_paragraph">Task: ${element.task} </p>
  <p class="detail_paragraph">Date: ${element.date}</p>
  <p class="detail_paragraph">Started: ${element.time}</p>
  <p class="detail_paragraph">Time spent: ${element.timeSpent}</p>
  `;
  return listEntry;
}
