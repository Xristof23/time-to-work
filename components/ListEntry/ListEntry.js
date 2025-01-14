export default function ListEntry(element) {
  const listEntry = document.createElement("article");
  listEntry.classList.add("listEntry");
  listEntry.innerHTML = /* html */ `
  <p class="detail_paragraph">Task: </p>
  <p class="detail_paragraph">Date: ${element.date}</p>
  <p class="detail_paragraph">Time spent: ${element.timeSpent}</p>
  `;
  return listEntry;
}
