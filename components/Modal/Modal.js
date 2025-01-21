const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

export default function Modal(props, id) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal1");
  const idText = id ? `${id}!` : "";
  modal.innerHTML = /*html*/ `
    <p> ${props.text} ${idText}</p>
      <button type="button" data-js="no-button" >
    ${props.button1}
    </button>
    <button type="button" class="yes_button" data-js="yes-button">
    ${props.button2}
    </button> 
    `;

  const noButton = modal.querySelector('[data-js="no-button"]');
  noButton.addEventListener("click", handleAbort);
  const yesButton = modal.querySelector('[data-js="yes-button"]');
  yesButton.addEventListener("click", handleYes);

  !props.button2 && yesButton.classList.add("button--passive");

  console.log(props.mode);

  function handleYes() {
    props.mode === "delete" ? deleteEntry(id) : "reset" ? realReset() : null;
    props.mode === "deleteAll" ? deleteAllEntries() : null;
  }

  function handleAbort() {
    modal.remove();
  }

  function realReset() {
    const startOutput = document.querySelector('[data-js="start-output"]');
    const endOutput = document.querySelector('[data-js="end-output"]');
    const timeOutput = document.querySelector('[data-js="time-output"]');
    startOutput.textContent = "";
    endOutput.textContent = "";
    timeOutput.textContent = "";
    location.reload();
  }
  function deleteEntry(id) {
    const updatedEntries = userEntries.filter((entry) => entry.id != id);
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    location.reload();
  }

  function deleteAllEntries() {
    console.log("reached delete All");
    const updatedEntries = [];
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    location.reload();
  }

  return modal;
}
