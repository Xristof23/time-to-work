export default function AreYouSure() {
  const areYouSure = document.createElement("div");
  areYouSure.classList.add("areYouSure");
  areYouSure.innerHTML = /*html*/ `
    <p>"Do you really want to reset? Have you saved your work? Press "No, abort." if you are not sure!"</p>
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
    console.log("pressed no");
    areYouSure.classList.toggle("areYouSure--passive");
  }

  function realReset() {
    const startOutput = document.querySelector('[data-js="start-output"]');
    const endOutput = document.querySelector('[data-js="end-output"]');
    const timeOutput = document.querySelector('[data-js="time-output"]');
    startOutput.textContent = 0;
    endOutput.textContent = 0;
    timeOutput.textContent = 0;
    areYouSure.classList.toggle("areYouSure--passive");
  }

  function handleYes() {
    realReset();
  }

  return areYouSure;
}
