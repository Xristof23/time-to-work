import ListContainer from "../ListContainer/ListContainer.js";

let entriesButtonCounter = 0;

export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button data-js="what-button">What?</button>
    <button data-js="entries-button">My entries</button>
`;
  const whatButton = menu.querySelector('[data-js="what-button"]');
  const entriesButton = menu.querySelector('[data-js="entries-button"]');

  whatButton.addEventListener("click", sayWhat);
  entriesButton.addEventListener("click", handleEntries);

  function sayWhat() {
    console.log("What?");
  }

  function handleEntries() {
    const app = document.getElementById("app");
    const listContainer = document.getElementById("list-container");
    entriesButtonCounter % 2 === 0
      ? app.append(ListContainer())
      : listContainer.remove();
    ++entriesButtonCounter;
  }

  return menu;
}
