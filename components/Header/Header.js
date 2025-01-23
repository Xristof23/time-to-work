import Menu from "../Menu/Menu.js";

Menu;
export default function Header(gloVars) {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = /* html */ `
  <h1 class="header_title">Time to work  <span class="version">v0.006</span></h1>
 
  `;
  header.append(Menu());
  return header;
}
