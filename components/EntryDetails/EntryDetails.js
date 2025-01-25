export default function EntryDetails(element) {
  const entryDetails = document.createElement("div");
  const { project, category, timeSpent } = element;
  entryDetails.setAttribute("id", `${element.id}d`);
  entryDetails.classList.add("entry_details");
  entryDetails.innerHTML = /* html */ `
<p class="detail_paragraph">Project: ${project} </p>
<p class="detail_paragraph">Category: ${category} </p>
<p class="detail_paragraph">Time spent: ${timeSpent}</p>
  `;
  return entryDetails;
}
