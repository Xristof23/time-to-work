import TimeRecords from "../TimeRecords/TimeRecords.js";

export default function ListContainer(userEntries) {
  const listContainer = document.createElement("section");
  listContainer.classList.add("list_container");
  listContainer.setAttribute("id", "list-container");
  listContainer.innerHTML = /*html*/ `
    <h2>My entries</h2>
`;
  listContainer.append(TimeRecords(userEntries));

  return listContainer;
}
