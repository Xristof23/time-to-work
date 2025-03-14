import Menu from "../Menu/Menu.js";

export default function Header() {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = /* html */ `

  <img class="logo" src="images/timetologo600neu.png" alt="Logo time to work or do what you want" />
  <span class="version">v0.065</span>
  `;
  header.append(Menu());
  return header;
}
