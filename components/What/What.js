export default function What(props) {
  const { headline, id, paragraph1, paragraph2 } = props;
  const what = document.createElement("section");
  what.classList.add("what");
  what.setAttribute("id", `${id}`);
  what.innerHTML = /*html*/ `
    <h2>${headline}<h2>
    <p class="standard_text"> ${paragraph1} </p>
    <p class="standard_text"> ${paragraph2}  </p>
    `;

  return what;
}
