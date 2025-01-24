import Menu from "../Menu/Menu.js";

Menu;
export default function Header(gloVars) {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = /* html */ `

  <img class="logo" src="images/timetologo600.jpg" alt="Logo time to work or do what you want" />
  <span class="version">v0.011</span>
  `;
  header.append(Menu());
  return header;
}
