export default function Menu() {
  const menu = document.createElement("nav");
  menu.classList.add("nav");
  menu.innerHTML = /*html*/ `
    <button>My entries</button> <button>What?</button>  
`;
  return menu;
}
