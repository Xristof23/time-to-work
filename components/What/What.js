export default function What() {
  const what = document.createElement("section");
  what.classList.add("what");
  what.setAttribute("id", "what");
  what.innerHTML = /*html*/ `
    <h2>What is this?<h2>
    <p class="standard_text"> It's a tool to control time. Like a time machine. Nah. More like a stop watch that records the time you spend on a task. </p>
    <p class="standard_text"> More functions on the way. </p>
    `;

  return what;
}
