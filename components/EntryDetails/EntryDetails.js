export default function EntryDetails(element) {
  const entryDetails = document.createElement("div");
  entryDetails.setAttribute("id", `${element.id}d`);
  entryDetails.innerHTML = /* html */ `


<p class="detail_paragraph">Project: <br/>${element.project} </p>
<p class="detail_paragraph">Category: ${element.category} </p>
<br/>
<p class="detail_paragraph">Time spent: ${element.timeSpent}</p>
<p class="detail_paragraph">Id: ${element.id} </p>
  
  `;
  return entryDetails;
}
