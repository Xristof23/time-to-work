export default function EntryDetails(element) {
  const entryDetails = document.createElement("div");
  entryDetails.setAttribute("id", `${element.id}d`);
  entryDetails.classList.add("entry_details");
  entryDetails.innerHTML = /* html */ `
<p class="detail_paragraph">Project: ${element.project} </p>
<p class="detail_paragraph">Category: ${element.category} </p>
<p class="detail_paragraph">Time spent: ${element.timeSpent}</p>
  `;
  return entryDetails;
}
