const userEntries = JSON.parse(localStorage.getItem("RecordedTasks")) || [];

export default function AreYouSure(text, goal, id) {
  const areYouSure = document.createElement("div");
  areYouSure.classList.add("areYouSure");
  areYouSure.innerHTML = /*html*/ `
    <p>"Do you really want to ${text} Press "No, abort." if you are not sure!"</p>
    <button type="button" class="no_button" data-js="no-button" >
    No, abort.
    </button>
    <button type="button" data-js="yes-button">
    Yes, go on.
    </button> 
    `;

  const noButton = areYouSure.querySelector('[data-js="no-button"]');
  noButton.addEventListener("click", handleAbort);

  const yesButton = areYouSure.querySelector('[data-js="yes-button"]');
  yesButton.addEventListener("click", handleYes);

  function handleAbort() {
    areYouSure.classList.toggle("areYouSure--passive");
  }

  function realReset() {
    const startOutput = document.querySelector('[data-js="start-output"]');
    const endOutput = document.querySelector('[data-js="end-output"]');
    const timeOutput = document.querySelector('[data-js="time-output"]');
    startOutput.textContent = "";
    endOutput.textContent = "";
    timeOutput.textContent = "";
    // areYouSure.classList.toggle("areYouSure--passive");
    location.reload();
  }
  function deleteEntry(id) {
    const updatedEntries = userEntries.filter((entry) => entry.id != id);
    localStorage.setItem("RecordedTasks", JSON.stringify(updatedEntries));
    location.reload();
  }

  function handleYes() {
    goal === "reset" ? realReset() : deleteEntry(id);
  }

  return areYouSure;
}
