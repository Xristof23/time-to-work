export default function Header(gloVars) {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = /* html */ `
  <h1 class="header_title">Time to work</h1>
  <div class="version">v0.006</div>
  `;
  return header;
}
